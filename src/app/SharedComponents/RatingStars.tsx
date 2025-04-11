const gradientNameForStar = (rating: number, star: number) => {
  if (rating >= star) return 'orange';
  if (star - rating >= 1) return 'transparent';
  return 'url(#rating-gradient)';
};

const RatingStars = ({ rating, size = 40 }: { rating: number, size?: number; }) => {
  const shiftPercentage = rating * 100 % 100;
  return (
    <svg viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg" height={`${size}px`}>
      <defs>
        <linearGradient id="rating-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${shiftPercentage}%`} stopColor="orange" />
          <stop offset={`${shiftPercentage}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={gradientNameForStar(rating, 1)}
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon
        points="36,2 39.09,8.26 46,9.27 41,14.14 42.18,21.02 36,17.77 29.82,21.02 31,14.14 26,9.27 32.91,8.26"
        fill={gradientNameForStar(rating, 2)}
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon
        points="60,2 63.09,8.26 70,9.27 65,14.14 66.18,21.02 60,17.77 53.82,21.02 55,14.14 50,9.27 56.91,8.26"
        fill={gradientNameForStar(rating, 3)}
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon
        points="84,2 87.09,8.26 94,9.27 89,14.14 90.18,21.02 84,17.77 77.82,21.02 79,14.14 74,9.27 80.91,8.26"
        fill={gradientNameForStar(rating, 4)}
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon
        points="108,2 111.09,8.26 118,9.27 113,14.14 114.18,21.02 108,17.77 101.82,21.02 103,14.14 98,9.27 104.91,8.26"
        fill={gradientNameForStar(rating, 5)}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default RatingStars;
