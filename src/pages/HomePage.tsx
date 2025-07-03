
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onProductClick?: (product: Product) => void;
}

const HomePage = ({ onPageChange, onProductClick }: HomePageProps) => {
  const { t, language } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const featuredProducts = products.slice(0, 4);
  
  const animatedWords = {
    ru: ['3D фигурки', 'Брелки', 'Стикеры', 'Открытки'],
    en: ['3D Figures', 'Keychains', 'Stickers', 'Postcards']
  };

  // Анимация смены слов
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords[language].length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-7xl">
          <div className="bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-16 space-y-6 lg:space-y-8">
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black leading-tight">
                    {language === 'ru' ? 'Эксклюзивные' : 'Exclusive'}
                    <br />
                    <span className="text-blue-600">
                      <span 
                        className={`transition-all duration-500 ease-in-out transform inline-block ${
                          isAnimating 
                            ? 'opacity-0 -translate-y-2 scale-95' 
                            : 'opacity-100 translate-y-0 scale-100'
                        }`}
                      >
                        {animatedWords[language][currentWordIndex]}
                      </span>
                    </span>
                    {' '}{language === 'ru' ? 'от' : 'from'} Barsh
                  </h1>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                    {language === 'ru' 
                      ? 'Магазин с авторскими товарами для любителей CG и визуального дизайна' 
                      : 'A shop with author goods for CG and visual design enthusiasts'
                    }
                  </p>
                </div>
                
                <Button 
                  onClick={() => onPageChange('catalog')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl w-fit flex items-center gap-2"
                >
                  {language === 'ru' ? 'Перейти в магазин' : 'Go to shop'}
                  <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              
              {/* Right side - Image */}
              <div className="relative min-h-[250px] lg:min-h-full">
                <img 
                  src='/img/main_photo.jpg'
                  alt="Barsh Shop Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                {t('featured_products')}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center sm:text-left">
                {t('featured_subtitle')}
              </p>
            </div>
            <Button 
              onClick={() => onPageChange('catalog')}
              variant="outline"
              className="hidden sm:flex items-center bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
            >
              {t('view_all')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductClick}
              />
            ))}
          </div>
          
          <div className="text-center sm:hidden">
            <Button 
              onClick={() => onPageChange('catalog')}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              {t('view_all')}
            </Button>
          </div>
        </div>
      </section>

      <Footer onPageChange={onPageChange} />
    </div>
  );
};

export default HomePage;
