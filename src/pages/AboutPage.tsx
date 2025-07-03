import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Footer from '../components/Footer';
import { Send } from 'lucide-react';


interface AboutPageProps {
  onPageChange: (page: string) => void;
}

const AboutPage = ({ onPageChange }: AboutPageProps) => {
  const { language, t } = useLanguage();

  const socialLinks = [
    { name: 'YouTube', icon: '/img/icons/YouTube_icon.svg', url: 'https://www.youtube.com/@a_barsh' },
    { name: 'Telegram', icon: '/img/icons/Telegram_icon.svg', url: 'https://t.me/BarshArt' },
    { name: 'Boosty', icon: '/img/icons/Boosty_icon.svg', url: 'https://boosty.to/andreybarsh' },
    { name: 'ArtStation', icon: '/img/icons/Artstation_icon.svg', url: 'https://www.artstation.com/andreos' },
    { name: 'TikTok', icon: '/img/icons/Tiktok_icon.svg', url: 'https://www.tiktok.com/@a.barsh?_t=ZM-8wu9O2N0kRJ&_r=1' }
  ];

  const workImages = [
    "/img/pictures_of_works/image1.jpg",
    "/img/pictures_of_works/image2.jpg",
    "/img/pictures_of_works/image3.jpg",
    "/img/pictures_of_works/image4.jpg",
    "/img/pictures_of_works/image5.jpg"
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* First Section - About Author */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('about_greeting')}
                </h1>
                
                <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                  <p>
                    {language === 'ru' ? (
                      <>Мой псевдоним - Barsh. Я 2D/3D художник, аниматор и автор блога, где делюсь своим опытом, процессами работы, мыслями о индустрии и искусстве.</>
                    ) : (
                      <>My nickname is Barsh. I am a 2D/3D artist, animator and blog author, where I share my experience, work processes, thoughts about the industry and art.</>
                    )}
                  </p>
                  <p>
                    {language === 'ru' ? (
                      <>Я из Санкт-Петербурга. Рисовать начал в 2019 году, осваивал академический рисунок и живопись около 2 лет в художественной студии. В это же время учился работать в Photoshop. Тогда же я впервые открыл Blender 3d.</>
                    ) : (
                      <>I am from St. Petersburg. I started drawing in 2019, mastering academic drawing and painting for about 2 years in an art studio. At the same time I learned to work in Photoshop. It was then that I first opened Blender 3d.</>
                    )}
                  </p>
                  <p>
                    {language === 'ru' ? (
                      <>В старших классах школы увлекся камерами и цветокоррекцией. Брал простые заказы по графическому дизайну для соц сетей. Начал изучать After Effects, Premier pro, Davinci.</>
                    ) : (
                      <>In high school, I became interested in cameras and color correction. I took simple graphic design orders for social networks. I started learning After Effects, Premier pro, Davinci.</>
                    )}
                  </p>
                  <p>
                    {language === 'ru' ? (
                      <>В 2022 году возобновил изучение 3D графики, некоторые из моих работ начали набирать просмотры на Sketchfab и Artstation. Появились интересные заказы.</>
                    ) : (
                      <>In 2022, I resumed studying 3D graphics, some of my works began to gain views on Sketchfab and Artstation. Interesting orders appeared.</>
                    )}
                  </p>
                  <p>
                    {language === 'ru' ? (
                      <>Первый опыт работы с иностранными заказчиками.</>
                    ) : (
                      <>First experience working with foreign clients.</>
                    )}
                  </p>
                  <p>
                    {language === 'ru' ? (
                      <>Веду канал на YouTube с 2023 года.</>
                    ) : (
                      <>I have been running a YouTube channel since 2023.</>
                    )}
                  </p>
                </div>
                </div>

                <div className="flex flex-col items-center space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                    <img 
                      src="/img/avatar.jpg"
                      alt="Андрей Барщевский"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 w-full max-w-xs">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-center py-2 sm:py-3 rounded-xl border-gray-300 hover:bg-gray-50 text-xs sm:text-sm"
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <img 
                          src={social.icon} 
                          alt={social.name} 
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
                        />
                        {social.name}
                      </Button>
                    ))}
                  </div>
                </div>
                </div>
                </div>

                {/* Second Section - Work and Inspiration with Slider */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 shadow-sm">
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                        {t('work_inspiration_title')}
                      </h2>
                      
                      <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                        <p>
                          {language === 'ru' ? (
                            <>Все моё творчество - это смесь 2D и 3D арта. Мне нравится сам процесс создания визуала. Такого, который передает настроение, возможно смысл или удовольствие, если речь про дизайн.</>
                          ) : (
                            <>All my creativity is a mixture of 2D and 3D art. I like the process of creating visuals. Those that convey mood, possibly meaning or pleasure, when it comes to design.</>
                          )}
                        </p>
                        <p>
                          {language === 'ru' ? (
                            <>В рисовании мне не нравится использовать много технологий и инструментов. Бывает достаточно одного слоя и кисти. Через простоту я сохраняю частичку магии.</>
                          ) : (
                            <>In drawing, I don't like using many technologies and tools. Sometimes one layer and a brush are enough. Through simplicity I preserve a piece of magic.</>
                          )}
                        </p>
                        <p>
                          {language === 'ru' ? (
                            <>Но при работе над 3D графикой или в видеопродакшене я всегда ищу лучшие комбинации инструментов.</>
                          ) : (
                            <>But when working on 3D graphics or video production, I always look for the best combinations of tools.</>
                          )}
                        </p>
                        <p>
                          {language === 'ru' ? (
                            <>Все что окружает меня и происходит со мной дает мне вдохновение. Личный опыт намного ценнее. Исходя из него можно развивать новые идеи.</>
                          ) : (
                            <>Everything that surrounds me and happens to me gives me inspiration. Personal experience is much more valuable. Based on it, you can develop new ideas.</>
                          )}
                        </p>
                        <p>
                          {language === 'ru' ? (
                            <>Кроме личных проектов я беру заказы в сфере производства 3D/2D графики: моделирование, анимация, концептинг, супервайзинг проекта. По вопросам сотрудничества пишите:</>
                          ) : (
                            <>In addition to personal projects, I take orders in the field of 3D/2D graphics production: modeling, animation, concepting, project supervision. For collaboration inquiries, write:</>
                          )}
                        </p>
                      </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <Button
                    variant="outline"
                    className="rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm"
                    onClick={() => window.open('https://t.me/AndreyBarsh', '_blank')}
                  >
                    TG @AndreyBarsh
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm break-all"
                    onClick={() => window.open('mailto:barsh.andrey@yandex.ru', '_blank')}
                  >
                    barsh.andrey@yandex.ru
                  </Button>
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <Carousel className="w-full max-w-sm sm:max-w-md mx-auto">
                  <CarouselContent>
                    {workImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
                          <img 
                            src={image}
                            alt={`${language === 'ru' ? 'Работа' : 'Work'} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>
            </div>
          </div>

          {/* Third Section - About Developer */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('developer_title')}
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p className="text-base sm:text-lg">
                {language === 'ru' ? (
                  <>Я — <span className="font-semibold text-gray-900">веб-разработчик</span> с широким спектром навыков и настоящей страстью к созданию <span className="font-semibold text-gray-900">современных, функциональных и красивых сайтов</span>. Мои компетенции охватывают всё: от проектирования удобного пользовательского интерфейса до реализации сложной логики на фронтенде и бэкенде.</>
                ) : (
                  <>I am a <span className="font-semibold text-gray-900">web developer</span> with a wide range of skills and a real passion for creating <span className="font-semibold text-gray-900">modern, functional and beautiful websites</span>. My competencies cover everything: from designing a convenient user interface to implementing complex logic on the frontend and backend.</>
                )}
              </p>
              
              <p>
                {language === 'ru' ? (
                  <>Специализируюсь на разработке сайтов и приложений на <span className="font-semibold text-gray-900">React</span> — создаю динамичные и отзывчивые интерфейсы, которые работают быстро и корректно на любом устройстве. Но этим дело не ограничивается — я также занимаюсь <span className="font-semibold text-gray-900">дизайном, версткой, интеграцией API, SEO-оптимизацией</span>, а иногда и полным стеком разработки «от идеи до результата».</>
                ) : (
                  <>I specialize in developing websites and applications on <span className="font-semibold text-gray-900">React</span> — I create dynamic and responsive interfaces that work quickly and correctly on any device. But it doesn't end there — I also do <span className="font-semibold text-gray-900">design, layout, API integration, SEO optimization</span>, and sometimes full stack development "from idea to result".</>
                )}
              </p>
              
              <p>
                {language === 'ru' ? (
                  <>Мне интересны как <span className="font-semibold text-gray-900">маленькие сайты-визитки</span>, так и <span className="font-semibold text-gray-900">масштабные веб-приложения</span>. Я всегда стремлюсь найти баланс между <span className="font-semibold text-gray-900">эстетикой и технической эффективностью</span>, чтобы результат не только выглядел круто, но и работал без сбоев.</>
                ) : (
                  <>I am interested in both <span className="font-semibold text-gray-900">small business card sites</span> and <span className="font-semibold text-gray-900">large-scale web applications</span>. I always strive to find a balance between <span className="font-semibold text-gray-900">aesthetics and technical efficiency</span>, so that the result not only looks cool, but also works without failures.</>
                )}
              </p>
              
              <p className="text-base sm:text-lg font-medium">
                {language === 'ru' ? (
                  <>Если вам нужен разработчик, который понимает не только код, но и дизайн, умеет слушать клиента и предлагать решения — <span className="font-semibold text-gray-900">вы обратились по адресу</span>.</>
                ) : (
                  <>If you need a developer who understands not only code, but also design, knows how to listen to the client and offer solutions — <span className="font-semibold text-gray-900">you have come to the right place</span>.</>
                )}
              </p>
              
              <div className="mt-6 sm:mt-8">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-xl"
                  onClick={() => window.open('https://t.me/RAFF_LEMs', '_blank')}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t('contact_telegram')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onPageChange={onPageChange} />
    </div>
  );
};

export default AboutPage;
