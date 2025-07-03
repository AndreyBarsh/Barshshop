import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { CartProvider } from '../contexts/CartContext';
import { Product } from '../contexts/CartContext';
import Header from '../components/Header';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import AboutPage from './AboutPage';
import CartPage from './CartPage';
import ProductPage from './ProductPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentPage('catalog');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onPageChange={setCurrentPage} 
            onProductClick={handleProductClick}
          />
        );
      case 'catalog':
        return <CatalogPage onProductClick={handleProductClick} onPageChange={setCurrentPage}/>;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage}/>;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage}/>;
      case 'product':
        return selectedProduct ? (
          <ProductPage 
            product={selectedProduct} 
            onBack={handleBackToCatalog}
          />
        ) : (
          <HomePage 
            onPageChange={setCurrentPage} 
            onProductClick={handleProductClick}
          />
        );
      default:
        return (
          <HomePage 
            onPageChange={setCurrentPage} 
            onProductClick={handleProductClick}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
