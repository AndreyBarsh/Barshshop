import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product, useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Берём первое изображение как основное
  const mainImage = product.images?.[0] || '/img/placeholder.jpg';

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1 w-full max-w-sm mx-auto sm:max-w-none"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={isHovered && product.images?.[1] ? product.images[1] : mainImage}
            alt={language === 'ru' ? product.name : product.nameEn}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          />
          
          {/* Overlay with view button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-xs sm:text-sm px-2 sm:px-3"
              onClick={(e) => {
                e.stopPropagation();
                if (onProductClick) onProductClick(product);
              }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {t('view_product')}
            </Button>
          </div>

          {/* Discount badge */}
          {product.discount && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4">
          <div className="mb-2 sm:mb-3">
            <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {t(product.category)}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base leading-tight">
            {language === 'ru' ? product.name : product.nameEn}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {product.price} {t('rubles')}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {product.originalPrice} {t('rubles')}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gray-800 from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm h-9 sm:h-10"
        >
          <ShoppingCart size={14} className="mr-1 sm:mr-2" />
          {t('add_to_cart')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;