"use client";

import ScrollToTopButton from '@/app/SharedComponents/ScrollToTopButton';
import ProductsGrid from './ProductGrid';
import ProductList from './ProductList';
import { useLocalStorageValues } from '@/infrastructure/tools/LocalStorage';

const ProductsMainView = () => {
  const { showProductGrid } = useLocalStorageValues('showProductGrid');
  if (showProductGrid === undefined) return null;

  return (
    <>
      {showProductGrid ? <ProductsGrid /> : <ProductList />}
      <ScrollToTopButton />
    </>
  );
};

export default ProductsMainView;
