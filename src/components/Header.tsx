
import React from 'react';
import { Search, ShoppingCart, Globe, Home, Package, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { getItemsCount } = useCart();

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="bg-black text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
              BARSH SHOP
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`font-medium transition-all duration-300 flex items-center space-x-1 ${
                currentPage === 'home'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Home size={18} />
              <span>{t('home')}</span>
            </button>
            <button
              onClick={() => onPageChange('catalog')}
              className={`font-medium transition-all duration-300 flex items-center space-x-1 ${
                currentPage === 'catalog'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Package size={18} />
              <span>{t('catalog')}</span>
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`font-medium transition-all duration-300 flex items-center space-x-1 ${
                currentPage === 'about'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <User size={18} />
              <span>{t('about_author')}</span>
            </button>
            <button
              onClick={() => onPageChange('cart')}
              className={`font-medium transition-all duration-300 relative flex items-center space-x-1 ${
                currentPage === 'cart'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {getItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {getItemsCount()}
                  </span>
                )}
              </div>
              <span>{t('cart')}</span>
            </button>
          </nav>

          {/* Language switcher */}
          <div className="flex items-center space-x-2">
            <Globe size={16} className="text-gray-500" />
            <Button
              variant={language === 'ru' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ru')}
              className="text-xs border-0 shadow-md"
            >
              RU
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="text-xs border-0 shadow-md"
            >
              EN
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-around border-t pt-4">
          <button
            onClick={() => onPageChange('home')}
            className={`flex flex-col items-center space-y-1 ${
              currentPage === 'home' ? 'text-indigo-600' : 'text-gray-700'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">{t('home')}</span>
          </button>
          <button
            onClick={() => onPageChange('catalog')}
            className={`flex flex-col items-center space-y-1 ${
              currentPage === 'catalog' ? 'text-indigo-600' : 'text-gray-700'
            }`}
          >
            <Package size={20} />
            <span className="text-xs">{t('catalog')}</span>
          </button>
          <button
            onClick={() => onPageChange('about')}
            className={`flex flex-col items-center space-y-1 ${
              currentPage === 'about' ? 'text-indigo-600' : 'text-gray-700'
            }`}
          >
            <User size={20} />
            <span className="text-xs">{t('about_author')}</span>
          </button>
          <button
            onClick={() => onPageChange('cart')}
            className={`flex flex-col items-center space-y-1 relative ${
              currentPage === 'cart' ? 'text-indigo-600' : 'text-gray-700'
            }`}
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {getItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {getItemsCount()}
                </span>
              )}
            </div>
            <span className="text-xs">{t('cart')}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
