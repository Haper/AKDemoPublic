'use client';

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const scrollData: Record<string, { className: string, scrollTop: number; }> = {};

export const useScrollHistory = () => {
  const pathName = usePathname();

  const oldHandler = useRef<(this: Document, ev: Event) => any>(null);

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
    if (oldHandler.current) window.removeEventListener('scroll', oldHandler.current);

    window.addEventListener('scroll', handleScroll, true);
    oldHandler.current = handleScroll;

    return () => {
      oldHandler.current && window.removeEventListener('scroll', handleScroll, true);
      oldHandler.current = null;
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
