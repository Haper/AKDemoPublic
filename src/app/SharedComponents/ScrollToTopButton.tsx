"use client";

import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TopArrowIcon } from './Icons';
import './ScrollToTopButton.scss';


type ScrollToTopButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
  const [show, setShow] = useState(false);
  const scrollContainer = useRef<Window | HTMLElement | null>(null);
  const button = useRef<HTMLButtonElement | null>(null);

  const handleScroll = useCallback((event: Event) => {
    const { target } = event;
    if (target) {
      const isDocument = event.target === document;
      const offset = isDocument ? window.scrollY : (target as HTMLDivElement).scrollTop;
      scrollContainer.current = isDocument ? window : target as HTMLDivElement;
      setShow(offset > 100);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    scrollContainer.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button {...props} onClick={scrollToTop} ref={button}
      className={classNames("ScrollToTopButton", show && "ScrollToTopButtonShow")}
    >
      <TopArrowIcon />
    </button>
  );
};

export default ScrollToTopButton;
