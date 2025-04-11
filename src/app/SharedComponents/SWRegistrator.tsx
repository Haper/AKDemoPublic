'use client';

import { useEffect } from 'react';

const SWRegistrator = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);
  return null;
};

export default SWRegistrator;
