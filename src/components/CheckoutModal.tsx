import React, { useState, useEffect } from 'react';
import { X, MapPin, Package, CreditCard, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import emailjs from '@emailjs/browser';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeliveryResponse {
  price: number;
  deliveryPossible: boolean;
  message?: string;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'cdek',
  });
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const fetchCdekToken = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/cdek-token');
    if (!response.ok) throw new Error('Ошибка при получении токена');

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Ошибка сервера при получении токена:', error);
    return null;
  }
};

  const now2 = new Date();
  const timezoneOffset = -now2.getTimezoneOffset();

  const tzHours = Math.floor(Math.abs(timezoneOffset) / 60)
    .toString()
    .padStart(2, '0');
  const tzMinutes = (Math.abs(timezoneOffset) % 60)
    .toString()
    .padStart(2, '0');
  const sign = timezoneOffset >= 0 ? '+' : '-';

  const formattedDate2 = now2.toISOString().split('.')[0] + `${sign}${tzHours}${tzMinutes}`;


  const calculateCdekDelivery = async (address: string, city: string, postalCode: string): Promise<DeliveryResponse> => {
  try {
    const accessToken = await fetchCdekToken();
    if (!accessToken) {
      return {
        price: 0,
        deliveryPossible: false,
        message: 'Ошибка авторизации в CDEK'
      };
    }

    const requestBody = {
      date: formattedDate2,
      type: 2,
      currency: 1,
      from_location: {
        postal_code: '195426',
        country_code: 'RU',
        city: 'Санкт-Петербург',
        address: 'Индустриальный просп., 19',
        contragent_type: 'sender'
      },
      to_location: {
        postal_code: postalCode,
        country_code: 'RU',
        city: city,
        address: address,
        contragent_type: 'recipient'
      },
      packages: [
        {
          weight: 100,
          length: 20,
          width: 20,
          height: 10
        }
      ]
    };

    const response = await fetch('http://localhost:3001/api/cdek-calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        price: 0,
        deliveryPossible: false,
        message: `Ошибка получения тарифа CDEK: ${text}`
      };
    }

    const data = await response.json();
    console.log('Ответ CDEK:', data);

    if (Array.isArray(data.tariff_codes) && data.tariff_codes.length > 0) {
      const bestTariff = data.tariff_codes.reduce((min: any, current: any) => {
        return current.delivery_sum < min.delivery_sum ? current : min;
      }, data.tariff_codes[0]);

      return {
        price: bestTariff.delivery_sum,
        deliveryPossible: true
      };
    }

    return {
      price: 0,
      deliveryPossible: false,
      message: 'Не удалось получить тариф CDEK'
    };
  } catch (error: any) {
    console.error('Ошибка при расчёте доставки CDEK:', error);
    return {
      price: 0,
      deliveryPossible: false,
      message: error.message || 'Неизвестная ошибка CDEK'
    };
  }
};


const now = new Date();

const formattedDate = now.toISOString().slice(0,10).replace(/-/g, '');
const formattedTime = now.toTimeString().slice(0,8).replace(/:/g, '');
const calculateRussianPostDelivery = async (postalCode: string): Promise<DeliveryResponse> => {
  try {
    const url = new URL('https://tariff.pochta.ru/v2/calculate/tariff');
    
    url.searchParams.set('json', '');
    url.searchParams.set('object', '2010');
    url.searchParams.set('weight', '100');
    url.searchParams.set('date', formattedDate);
    url.searchParams.set('time', formattedTime);
    url.searchParams.set('from', '195279');
    url.searchParams.set('to', postalCode);
    url.searchParams.set('retutn', postalCode);
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      const text = await response.text();
      return {
        price: 0,
        deliveryPossible: false,
        message: `Ошибка от сервера Почты: ${response.status} - ${text}`
      };
    }
    
    const data = await response.json();
    console.log('Ответ Почты:', data);
    
    if (data.paynds) {
      return {
        price: Math.round(data.paynds / 100),
        deliveryPossible: true
      };
    } else if (data.errors && data.errors.length > 0) {
      return {
        price: 0,
        deliveryPossible: false,
        message: data.errors.map((e: any) => e.msg).join('; ')
      };
    } else {
      return {
        price: 0,
        deliveryPossible: false,
        message: 'Стоимость доставки не найдена в ответе'
      };
    }
  } catch (error: any) {
    console.error('Ошибка API Почты:', error);
    return {
      price: 0,
      deliveryPossible: false,
      message: error.message || 'Ошибка запроса'
    };
  }
};

  const calculateDelivery = async () => {
    if (!formData.city || !formData.postalCode) return;
    
    setIsCalculating(true);
    setDeliveryError(null);
    
    try {
      let result: DeliveryResponse;
      
      if (formData.deliveryMethod === 'cdek') {
        result = await calculateCdekDelivery(formData.postalCode, formData.city, formData.address);
      } else {
        result = await calculateRussianPostDelivery(formData.postalCode);
      }
      
      if (result.deliveryPossible) {
        setDeliveryPrice(result.price);
      } else {
        setDeliveryPrice(0);
        setDeliveryError(result.message || t('delivery_not_available'));
      }
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (formData.city && formData.postalCode && formData.deliveryMethod) {
      const debounceTimer = setTimeout(() => {
        calculateDelivery();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [formData.city, formData.postalCode, formData.deliveryMethod]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await calculateDelivery();
    
    if (deliveryError) {
      return;
    }

    const orderItemsText = items
    .map(item => `${item.name} — ${item.quantity} шт.`)
    .join(', ');
    
    const subtotal = getTotalPrice();
    const deliveryCost = deliveryPrice;
    const total = subtotal + deliveryCost;

    try {
      await emailjs.send('service_jdxdkxv', 'template_3hv5wi1', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        deliveryMethod: formData.deliveryMethod === 'cdek' ? 'CDEK' : 'Почта России',
        orderItems: orderItemsText,
        subtotal: `${subtotal} ₽`,
        deliveryCost: `${deliveryCost} ₽`,
        total: `${total} ₽`,
      }, '40c5TgDjraA35xYos');
      console.log('Email sent successfully');
    } catch (error) {
      console.error('EmailJS Error:', error);
    }


    console.log('Order submitted:', { 
      formData, 
      items, 
      totalPrice: getTotalPrice() + deliveryPrice 
    });
    
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => {
      onClose();
      setOrderPlaced(false);
    }, 2000);
  };

  const totalPrice = getTotalPrice();
  const finalPrice = totalPrice + (deliveryError ? 0 : deliveryPrice);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-screen h-screen overflow-y-auto p-0 m-0 rounded-none">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-4 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                {orderPlaced ? t('order_placed') : t('checkout_title')}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {orderPlaced ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('order_success')}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="flex-1 p-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Package className="w-5 h-5" />
                          {t('customer_info')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">{t('first_name')}</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">{t('last_name')}</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">{t('phone_number')}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+7 (999) 999-99-99"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('email')}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <MapPin className="w-5 h-5" />
                          {t('delivery_address')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="city">{t('city')}</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder={t('enter_city')}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">{t('street_address')}</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder={t('enter_address')}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">{t('postal_code')}</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="123456"
                            required
                            pattern="\d{6}"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label>{t('delivery_method')}</Label>
                          <div className="flex space-x-4 mt-2">
                            <div
                              onClick={() => handleInputChange('deliveryMethod', 'cdek')}
                              className={`cursor-pointer border rounded-lg p-2 flex items-center space-x-2 ${
                                formData.deliveryMethod === 'cdek' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                              }`}
                            >
                              <img src="/img/CDEK_logo.png" alt="CDEK" className="w-10 h-10 object-contain" />
                            </div>
                            <div
                              onClick={() => handleInputChange('deliveryMethod', 'post')}
                              className={`cursor-pointer border rounded-lg p-2 flex items-center space-x-2 ${
                               formData.deliveryMethod === 'post' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                              }`}
                            >
                               <img src="/img/Post_logo.png" alt="Почта России" className="w-10 h-10 object-contain" />
                            </div>
                          </div>
                          <div className="flex space-x-4 mt-2">
                            <span>
                              {formData.deliveryMethod === 'cdek' 
                                ? t('delivery_cdek') 
                                : t('delivery_post')}:
                            </span>
                            <span>
                            {formData.deliveryMethod === 'cdek' ? (
                              deliveryError ? (
                              <span className="text-red-500">{t('not_available')}</span>
                            ) : (
                              `${deliveryPrice} ${t('rubles')}`
                            )
                            ) : deliveryError ? (
                              <span className="text-red-500">{t('not_available')}</span>
                            ) : (
                              `${deliveryPrice} ${t('rubles')}`
                            )}
                          </span>
                          </div>
                        </div>
                        
                        {deliveryError && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {deliveryError}
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{t('order_items')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 max-h-60 overflow-y-auto">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 pb-3 border-b last:border-b-0">
                              <img
                                src={item.images?.[0] || '/img/placeholder.jpg'}
                                alt={language === 'ru' ? item.name : item.nameEn}
                                className="w-12 h-12 object-cover rounded flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">
                                  {language === 'ru' ? item.name : item.nameEn}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} × {item.price} {t('rubles')}
                                </p>
                              </div>
                              <div className="text-sm font-medium">
                                {item.quantity * item.price} {t('rubles')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <CreditCard className="w-5 h-5" />
                          {t('order_summary')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>{t('subtotal')}:</span>
                          <span>{totalPrice} {t('rubles')}</span>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>{t('total')}:</span>
                            <span>
                              {deliveryError ? (
                                <span className="text-red-500">{t('check_delivery')}</span>
                              ) : (
                                `${finalPrice} ${t('rubles')}`
                              )}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white py-3"
                          disabled={
                            !formData.firstName || 
                            !formData.lastName || 
                            !formData.phone || 
                            !formData.address ||
                            !formData.city ||
                            !formData.postalCode ||
                            isCalculating ||
                            !!deliveryError
                          }
                        >
                          {t('place_order')}
                        </Button>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          {t('by_clicking_you_agree')}{' '}
                          <a href="/documents/privacy-policy.pdf" className="text-blue-600 hover:underline">
                            {t('privacy_policy')}
                          </a>{' '}
                          {t('and')}{' '}
                          <a href="/documents/terms-of-sale.pdf" className="text-blue-600 hover:underline">
                            {t('terms_of_sale')}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;