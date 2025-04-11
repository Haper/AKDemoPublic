'use client';

import { useEffect } from 'react';
import './ParallaxBackground.scss';

const ParallaxBackground = () => {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      Object.assign(document.documentElement, {
        style: `
        --mouse-y: ${(e.clientX - window.innerWidth / 2) * 0.005}deg;
        --mouse-x: ${-(e.clientY - window.innerHeight / 2) * 0.01}deg;
        `
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="ParallaxBackgroundMainContainer">
      <div className="LayersContainer">
        <div className="LayerItem Layer0" style={{ backgroundImage: `url('/parallax_bg/bg_0.jpg')` }} />
        <div className="LayerItem Layer1" style={{ backgroundImage: `url('/parallax_bg/bg_1.png')` }} />
        <div className="LayerItem Layer2" style={{ backgroundImage: `url('/parallax_bg/bg_2.png')` }} />
        <div className="LayerItem Layer3" style={{ backgroundImage: `url('/parallax_bg/bg_3.png')` }} />
      </div>
    </div>
  );
};

export default ParallaxBackground;
