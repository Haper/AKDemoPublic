"use client";

import { useCallback, useEffect, useState } from "react";

export const isMobile = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  return mediaQuery.matches;
};

export const useIsMobile = (): boolean | undefined => {
  const [mobile, setMobile] = useState<boolean | undefined>(isMobile());

  const handleResize = useCallback(() => {
    setMobile(isMobile());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mobile;
};
