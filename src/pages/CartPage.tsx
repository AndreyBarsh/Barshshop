import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CheckoutModal from '../components/CheckoutModal';
import Footer from '../components/Footer';

interface CartPageProps {
  onPageChange?: (page: string) => void;
}

const CartPage = ({ onPageChange }: CartPageProps) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { language, t } = useLanguage();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    if (onPageChange) {
      onPageChange('catalog');
    } else {
      console.warn('Navigation function not provided');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('cart')}</h1>
            <p className="text-gray-500 text-lg mb-6">{t('empty_cart')}</p>
            <Button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('continue_shopping')}
            </Button>
          </div>
        </div>
        <Footer onPageChange={onPageChange} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl flex-1">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('cart')}</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleContinueShopping}
            className="text-blue-600 hover:text-blue-700"
          >
            {t('continue_shopping')}
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.quantity}`} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <img
                      src={item.images?.[0] || '/img/placeholder.jpg'}
                      alt={language === 'ru' ? item.name : item.nameEn}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                    />
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {language === 'ru' ? item.name : item.nameEn}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.price} {t('rubles')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-2">
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 p-0"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0 flex-shrink-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('order_summary')}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">{t('items')}:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>{t('total')}:</span>
                    <span>{totalPrice} {t('rubles')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                    onClick={handleCheckout}
                  >
                    {t('checkout')}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                    onClick={clearCart}
                  >
                    {t('clear_cart')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            clearCart();
            if (onPageChange) {
              onPageChange('home');
            }
          }}
        />
      </div>
      
      <Footer onPageChange={onPageChange} />
    </div>
  );
};

export default CartPage;