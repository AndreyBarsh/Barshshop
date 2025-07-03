import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const CLIENT_ID = 'lCjcnnO7GiGecpY3QAShfncEmBZaGNHa';
const CLIENT_SECRET = 'wle9xsSpcFLJqf1IjhJlwobJCYYS55La';

let cached = { token: null, expires: 0 };

async function getToken() {
  const now = Date.now();

  if (cached.token && now < cached.expires) return cached.token;

  console.log('Запрашиваем новый токен у CDEK...');

  const res = await fetch('https://api.cdek.ru/v2/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Ошибка получения токена CDEK: ${errText}`);
  }

  const json = await res.json();
  console.log('Ответ от CDEK:', json);

  cached.token = json.access_token;
  cached.expires = now + (json.expires_in - 60) * 1000;
  return cached.token;
}

app.post('/api/cdek-calculate', async (req, res) => {
  try {
    console.log('Получен запрос от клиента:', req.body);

    const accessToken = await getToken();
    if (!accessToken) {
      throw new Error('Не удалось получить токен CDEK');
    }

    const cdekResp = await fetch('https://api.cdek.ru/v2/calculator/tarifflist', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await cdekResp.text(); // <- сначала как текст
    console.log('Ответ от CDEK:', data);

    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error('Ошибка разбора ответа CDEK:', parseErr);
      res.status(500).json({ error: `Ошибка CDEK: ${data}` });
    }

  } catch (err) {
    console.error('Ошибка на сервере при расчёте CDEK:', err);
    res.status(500).json({ error: 'Ошибка расчета CDEK', details: err.message });
  }
});

app.get('/api/cdek-token', async (req, res) => {
  try {
    const token = await getToken();
    res.json({ access_token: token });
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении токена' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
