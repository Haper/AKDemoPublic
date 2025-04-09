import { useEffect, useRef } from "react";
import type { EffectCallback, DependencyList } from 'react';

export const useLazyEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const firstStart = useRef(true);
  const prevDeps = useRef<DependencyList | undefined>(deps);

  useEffect(() => {
    if (firstStart.current) {
      const hasDiffs = deps?.some((dep, i) => dep !== prevDeps.current?.[i]);
      if (!hasDiffs) {
        return;
      }
      firstStart.current = false;
    }
    return effect();
  }, deps);
};
