'use client';

import {
  ArrowLeft,
  ArrowRight
} from '@/app/SharedComponents/Icons';
import classNames from 'classnames';
import { useState } from 'react';
import './ProductDetailsGallery.scss';
import ProductDetailsGalleryModal from './ProductDetailsGalleryModal';

const ProductDetailsGallery = ({ images }: { images: string[], }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);

  if (images.length === 0) return null;

  const showButtons = images.length > 1;

  const goForward = () => {
    setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1);
  };

  const goBackward = () => {
    setImgIndex(imgIndex === 0 ? images.length - 1 : imgIndex - 1);
  };

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  return (
    <>
      <div className="ProductDetailsGalleryMainContainer">
        {images.map((image, index) => {
          return (
            <div key={index} onClick={toggleFullScreen}
              className={classNames('ProductGalleryImage', (imgIndex === index) && 'ProductGalleryImageActive')}
            >
              <img src={image} alt={''} />
            </div>
          );
        })}

        {showButtons && <>
          <div className="ProductGalleryButton" onClick={goBackward}>
            <ArrowLeft width={24} height={24} />
          </div>
          <div className="ProductGalleryButton ProductGalleryButtonRight" onClick={goForward}>
            <ArrowRight width={24} height={24} />
          </div>
        </>}
      </div>

      {showFullScreen &&
        <ProductDetailsGalleryModal images={images} startIndex={imgIndex} toggleFullScreen={toggleFullScreen} />
      }
    </>
  );
};

export default ProductDetailsGallery;
