import { useRef } from "react";

export const useDoubleTap = (callback: (event: React.MouseEvent<HTMLDivElement>) => void, delay = 300) => {
  const tapCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    tapCountRef.current += 1;

    if (tapCountRef.current === 2) {
      callback(event);
      tapCountRef.current = 0;
      clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, delay);
    }
  };

  return { onClick };
};
