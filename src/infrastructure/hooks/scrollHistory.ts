'use client';

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect } from "react";

const scrollData: Record<string, { className: string, scrollTop: number; }> = {};

export const useScrollHistory = () => {
  const pathName = usePathname();

  // Save updated scroll position
  const handleScroll = useCallback((event: Event) => {
    const target = event.target;
    if (target) {
      const isDocument = target === document;
      scrollData[pathName] = {
        className: isDocument ? '' : (target as HTMLDivElement).className,
        scrollTop: isDocument ? window.scrollY : (target as HTMLDivElement).scrollTop
      };
    }
  }, [pathName]);

  // Add scroll listener
  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  // Restore scroll position
  useEffect(() => {
    if (scrollData[pathName]) {
      const element = scrollData[pathName].className
        ? document.getElementsByClassName(scrollData[pathName].className)?.[0]
        : window;

      if (element) {
        element.scrollTo({
          top: scrollData[pathName].scrollTop,
          behavior: 'instant',
        });
      }
    }
  }, [pathName]);
};
