'use client';

import {
  ArrowLeft,
  ArrowRight,
  CloseButtonIcon
} from '@/app/SharedComponents/Icons';
import Modal from '@/app/SharedComponents/Modal';
import { useDoubleTap } from '@/infrastructure/hooks/doubleTap';
import classNames from 'classnames';
import { motion, useMotionValue } from 'framer-motion';
import { useIsMobile } from '@/infrastructure/tools/Environment';
import { useEffect, useRef, useState, useCallback } from 'react';

const ProductDetailsGalleryModal = (
  { images, startIndex, toggleFullScreen }: { images: string[]; startIndex: number; toggleFullScreen: () => void; }
) => {
  const isMobile = useIsMobile();

  const [imgIndex, setImgIndex] = useState(startIndex);
  const [showBig, setShowBig] = useState(false);
  const clicked = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });

  const originX = useMotionValue(0);
  const originY = useMotionValue(0);

  const mousemove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (clicked.current) {
      const { clientX, clientY } = event;
      const distanceX = (clientX - startPoint.current.x) / window.innerWidth;
      const distanceY = (clientY - startPoint.current.y) / window.innerHeight;
      originX.set(Math.min(Math.max(originX.get() - distanceX, 0), 1));
      originY.set(Math.min(Math.max(originY.get() - distanceY, 0), 1));
      startPoint.current = { x: clientX, y: clientY };
    }
  }, []);

  const mousedown = useCallback((event: MouseEvent) => {
    clicked.current = true;
    startPoint.current = { x: event.clientX, y: event.clientY };
  }, []);

  const mouseup = useCallback(() => {
    clicked.current = false;
  }, []);

  useEffect(() => {
    if (showBig) {
      window.addEventListener('mousemove', mousemove as () => any, false);
      window.addEventListener('mousedown', mousedown as () => any, false);
      window.addEventListener('mouseup', mouseup as () => any, false);
      window.addEventListener('mouseleave', mouseup as () => any, false);
    } else {
      window.removeEventListener('mousemove', mousemove as () => any, false);
      window.removeEventListener('mousedown', mousedown as () => any, false);
      window.removeEventListener('mouseup', mouseup as () => any, false);
      window.removeEventListener('mouseleave', mouseup as () => any, false);
    }

    return () => {
      window.removeEventListener('mousemove', mousemove as () => any, false);
      window.removeEventListener('mousedown', mousedown as () => any, false);
      window.removeEventListener('mouseup', mouseup as () => any, false);
      window.removeEventListener('mouseleave', mouseup as () => any, false);
    };
  }, [showBig]);

  const goForward = () => {
    setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1);
  };

  const goBackward = () => {
    setImgIndex(imgIndex === 0 ? images.length - 1 : imgIndex - 1);
  };

  const doubleTapBind = useDoubleTap((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isMobile) {
      if (!showBig) {
        const { clientX, clientY } = event;
        originX.set(clientX / window.innerWidth);
        originY.set(clientY / window.innerHeight);
      }
      setShowBig(!showBig);
    }
  });

  const showButtons = images.length > 1;

  return (
    <Modal>
      <div className='ProductDetailsGalleryMainContainer ProductGalleryMainContainerFullScreen'>
        {images.map((image, index) => {
          return (
            <motion.div key={index} {...doubleTapBind}
              className={classNames('ProductGalleryImage', (imgIndex === index) && 'ProductGalleryImageActive')}
              style={{ originX, originY }}
              animate={{ scale: showBig ? 2 : 1 }}
            >
              <img src={image} alt={''} />
            </motion.div>
          );
        })}

        {showButtons && <>
          <div onClick={goBackward}
            className={classNames('ProductGalleryButton', showBig && 'ProductGalleryButtonHidden')}
          >
            <ArrowLeft width={40} height={40} />
          </div>
          <div onClick={goForward}
            className={classNames('ProductGalleryButton',
              'ProductGalleryButtonRight',
              showBig && 'ProductGalleryButtonHidden'
            )}
          >
            <ArrowRight width={40} height={40} />
          </div>
        </>}

        <div className="ProductGalleryCloseButton" onClick={toggleFullScreen}>
          <CloseButtonIcon width={48} height={48} />
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsGalleryModal;
//transform: `translate(${transX}px, ${transY}px)`