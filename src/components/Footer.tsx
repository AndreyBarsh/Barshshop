import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer = ({ onPageChange }: FooterProps) => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'YouTube', icon: '/img/icons/YouTube_icon.svg', url: 'https://www.youtube.com/@a_barsh' },
    { name: 'Telegram', icon: '/img/icons/Telegram_icon.svg', url: 'https://t.me/BarshArt' },
    { name: 'Boosty', icon: '/img/icons/Boosty_icon.svg', url: 'https://boosty.to/andreybarsh' },
    { name: 'ArtStation', icon: '/img/icons/Artstation_icon.svg', url: 'https://www.artstation.com/andreos' },
    { name: 'TikTok', icon: '/img/icons/Tiktok_icon.svg', url: 'https://www.tiktok.com/@a.barsh?_t=ZM-8wu9O2N0kRJ&_r=1' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Barsh Shop</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {t('footer_brand_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800">{t('footer_navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onPageChange('home')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {t('footer_home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('catalog')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {t('footer_catalog')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('about')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {t('footer_about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('cart')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {t('footer_cart')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800">{t('footer_contacts')}</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm sm:text-base">@AndreyBarsh</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm sm:text-base break-all">barsh.andrey@yandex.ru</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800">{t('footer_social')}</h4>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                  onClick={() => window.open(social.url, '_blank')}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="w-4 h-4" 
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-gray-200" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
          <p className="text-gray-600 text-sm">
            {t('footer_copyright')}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 transition-all duration-200 hover:text-white"
            onClick={() => window.open('https://t.me/RAFF_LEMs', '_blank')}
          >
            <Globe className="w-4 h-4 mr-2" />
            {t('order_website_button')}
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;