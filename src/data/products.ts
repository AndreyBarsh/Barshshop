import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: 'Стикерпак «Растения»',
    nameEn: 'Sticker pack «Plants»',
    price: 250,
    originalPrice: 325,
    discount: 30,
    category: 'stickers',
    categoryRu: 'Стикеры',
    images: [
      '/img/products/Sticker_Pack_Plants/image1.jpg',
      '/img/products/Sticker_Pack_Plants/image2.jpg',
      '/img/products/Sticker_Pack_Plants/image3.jpg',
      '/img/products/Sticker_Pack_Plants/image4.jpg',
      '/img/products/Sticker_Pack_Plants/image5.jpg',
      '/img/products/Sticker_Pack_Plants/image6.jpg'
    ],
    details: 'Виниловые с глянцевой ламинацией А5\nВес 0,01 кг\nГабариты 13,5 × 9 × 0,3 см',
    detailsEn: 'Vinyl with glossy lamination A5\nWeight 0.01 kg\nDimensions 13.5 × 9 × 0.3 cm',
    description: 'Набор из 18 стикеров на глянцевой бумаге. Упакован в прозрачный пакетик с хэдером. Виды растений: Борщевик, Репейник, Маки, Одуванчики, Ромашки в траве, Эпипремнум.',
    descriptionEn: 'Set of 18 stickers on glossy paper. Packed in a transparent bag with a header. Plant species: Hogweed, Burdock, Poppies, Dandelions, Chamomile in the grass, Epipremnum.'
  },
  {
    id: 2,
    name: 'Открытка «Заснеженный дворец»',
    nameEn: 'Postcard «Snowy Palace»',
    price: 190,
    originalPrice: 266,
    discount: 40,
    category: 'postcards',
    categoryRu: 'Открытки',
    images: [
      '/img/products/Postcard_Snowy_Palace/image1.jpg',
      '/img/products/Postcard_Snowy_Palace/image2.jpg',
      '/img/products/Postcard_Snowy_Palace/image3.jpg',
      '/img/products/Postcard_Snowy_Palace/image4.jpg',
      '/img/products/Postcard_Snowy_Palace/image5.jpg',
      '/img/products/Postcard_Snowy_Palace/image6.jpg'
    ],
    details: 'Бумага А6 матовая плотность 230 гр/м\nВес 0,01 кг\nГабариты 13,5 × 9 × 0,3 см',
    detailsEn: 'Paper A6 matte density 230 g/m\nWeight 0.01 kg\nDimensions 13.5 × 9 × 0.3 cm',
    description: 'Отправлю эксклюзивную открытку из Санкт-Петербурга на ваше имя. На картине изображен заброшенный дворец князя Михаила Николаевича. Нарисовано в 2025 году. ',
    descriptionEn: 'I will send an exclusive postcard from St. Petersburg to your name. The painting depicts the abandoned palace of Prince Mikhail Nikolaevich. Drawn in 2025.'
  }
];