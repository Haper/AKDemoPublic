import './LeftMenuBackground.scss';

const LeftMenuBackground = () => {
  return (
    <div className="LeftMenuBackground">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1000 1440 10440" className="Hills One">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop className='GradientStart' offset="0%" />
            <stop className='GradientEnd' offset="100%" />
          </linearGradient>
        </defs>
        <path d="M0,160 C480,260 960,60 1440,160 L1440,10440 L0,10440 Z" fill="url(#gradient1)" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1200 1440 10440" className="Hills Two">
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop className='GradientStart' offset="0%" />
            <stop className='GradientEnd' offset="100%" />
          </linearGradient>
        </defs>
        <path d="M0,220 C360,320 1080,720 1440,220 L1440,10440 L0,10440 Z" fill="url(#gradient2)" />
      </svg>
    </div>
  );
};

export default LeftMenuBackground;
