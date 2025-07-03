
import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from '../components/Footer';

interface CatalogPageProps {
  onPageChange: (page: string) => void;
  onProductClick?: (product: Product) => void;
}

const CatalogPage = ({ onProductClick, onPageChange }: CatalogPageProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');

  const categories = [
    { id: 'all', labelKey: 'all_categories' },
    { id: 'stickers', labelKey: 'stickers' },
    { id: 'keychains', labelKey: 'keychains' },
    { id: 'postcards', labelKey: 'postcards' },
    { id: 'figures_3d', labelKey: 'figures_3d' }
  ];

  const sortOptions = [
    { id: 'none', label: 'По умолчанию' },
    { id: 'price_asc', label: 'Цена: по возрастанию' },
    { id: 'price_desc', label: 'Цена: по убыванию' },
    { id: 'date_new', label: 'Сначала новые' },
    { id: 'date_old', label: 'Сначала старые' }
  ];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Сортировка
    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date_new') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'date_old') {
      filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Search - полная ширина */}
        <div className="mb-4 sm:mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-10 sm:h-12 border-0 shadow-lg text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Categories - обычные кнопки без карусели */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="border-0 shadow-md hover:shadow-lg transition-all h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm lg:text-base"
              >
                <Filter size={14} className="mr-1 sm:mr-2" />
                {t(category.labelKey)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          <div className="text-gray-600 text-sm sm:text-base order-2 sm:order-1 text-center sm:text-left">
            Найдено товаров: {filteredProducts.length}
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <ArrowUpDown size={14} className="text-gray-500 flex-shrink-0" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] bg-white shadow-sm border-gray-200 text-xs sm:text-sm">
                <SelectValue placeholder="Выберите сортировку" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {sortOptions.map(option => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-xs sm:text-sm cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">{t('no_products_found')}</p>
          </div>
        )}
      </div>
      
      <Footer onPageChange={onPageChange} />
    </div>
  );
};

export default CatalogPage;
