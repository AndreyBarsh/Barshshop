
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Share2, Star, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Product, useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

const ProductPage = ({ product, onBack }: ProductPageProps) => {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  // Simulate multiple images for the product
  const productImages = product.images.length > 0 
    ? product.images 
    : ['/placeholder.jpg']; // можно добавить запасное изображение

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 hover:bg-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          {language === 'ru' ? 'Назад к каталогу' : 'Back to catalog'}
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-white">
                <img
                  src={productImages[currentImageIndex]}
                  alt={language === 'ru' ? product.name : product.nameEn}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-600 ring-2 ring-blue-600/20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {language === 'ru' ? product.categoryRu : product.category}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {language === 'ru' ? product.name : product.nameEn}
              </h1>
              
              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price} ₽
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice} ₽
                  </span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white h-11"
                >
                  {language === 'ru' ? 'В корзину' : 'Add to cart'}
                </Button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'description'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {language === 'ru' ? 'ОПИСАНИЕ' : 'DESCRIPTION'}
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'details'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {language === 'ru' ? 'ДЕТАЛИ' : 'DETAILS'}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'ru' 
                        ? product.description
                        : product.descriptionEn
                      }
                    </p>
                  </div>
                )}
                
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    {(language === 'ru' ? product.details : product.detailsEn)
                      .split(/(?:\n|<br>)/)
                      .map((line, index) => (
                        line.trim() && (
                          <p key={index} className="text-gray-600">
                            • {line}
                          </p>
                        )
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Delivery Info Collapsible */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="font-medium text-gray-900">
                    {language === 'ru' ? 'Информация о доставке' : 'Delivery Information'}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${showDeliveryInfo ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {showDeliveryInfo && (
                  <div className="pb-4 space-y-2 text-sm text-gray-600">
                    <p>🚚 {language === 'ru' ? 'Бесплатная доставка от' : 'Free delivery from'} 1000 ₽</p>
                    <p>📦 {language === 'ru' ? 'Срок доставки' : 'Delivery time'}: 3-5 {language === 'ru' ? 'рабочих дней' : 'business days'}</p>
                    <p>↩️ {language === 'ru' ? 'Возврат в течение' : 'Return within'} 30 {language === 'ru' ? 'дней' : 'days'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
