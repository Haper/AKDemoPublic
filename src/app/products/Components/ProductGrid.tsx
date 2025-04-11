"use client";

import ListError from '@/app/SharedComponents/ListError';
import ListLoader from '@/app/SharedComponents/ListLoader';
import RatingStars from '@/app/SharedComponents/RatingStars';
import { Products } from '@/domain/api/Types';
import { useLoadWithPaginationRedux } from '@/domain/hooks/loadWithPaginationRedux';
import type { ProductsStateType } from '@/domain/store/products';
import {
  clearProductList,
  getProducts,
  useProductStore,
  useProductsStore
} from '@/domain/store/products';
import { useScrollHistory } from '@/infrastructure/hooks/scrollHistory';
import Link from 'next/link';
import { memo, useRef } from 'react';
import './ProductGrid.scss';

// Grid with redux state
const ProductsGrid = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [productsState, error, loading, hasMore, tryAgain] =
    useLoadWithPaginationRedux<ProductsStateType, Products>(useProductsStore, getProducts, clearProductList, loaderRef);

  useScrollHistory();

  const showNoUsers = !hasMore && productsState.ids.length === 0;
  const showLoader = hasMore && !showNoUsers && !error;

  return (
    <div className={'BasicGridMainContainer ProductGridMainContainer'}>
      {productsState.ids.map(id => <ProductGridItem key={id} id={id} />)}
      {showLoader && <ListLoader ref={loaderRef} className='BasicGridLoaderContainer' showLoader={loading} />}
      {showNoUsers && 
        <h2 ref={loaderRef} className='BasicGridLoaderContainer text-3xl'>There are no products matching your search.</h2>
      }
      {(error as Error) && <ListError className='BasicGridLoaderContainer' error={error as Error} tryAgain={tryAgain} />}
    </div>
  );
};

const ProductGridItem = memo(({ id }: { id: number; }) => {
  const { title, description, thumbnail, price, rating } = useProductStore(id);
  return (
    <Link className={'BasicGridItemContainer flex flex-col'} href={`/products/${id}`}>
      <img className={'ProductsListBgThumbnail'} src={thumbnail} alt={''} />
      <h4 className="text-xl font-semibold mb-1.5">{title}</h4>
      <div className='line-clamp-3'>{description}</div>
      <img className={'ProductsListThumbnail'} src={thumbnail} alt={''} />
      <div className={'PriceContainer'}>
        <div className={'text-xl font-bold'}>{`${price} EUR`}</div>
        <RatingStars rating={rating} size={20} />
      </div>
    </Link>
  );
});

export default ProductsGrid;
