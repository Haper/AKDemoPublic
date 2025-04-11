import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyEffect } from "@/infrastructure/hooks/lazyEffect";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 20;

type UseLoadWithPaginationReturn<T> = [
  data: T,
  error: unknown,
  loading: boolean,
  showLoader: boolean,
  getMore: () => Promise<void>
];

export const useLoadWithPaginationRedux = <T extends { skip: number; }, U extends { total: number; skip: number; }>(
  useDataReducer: () => T,
  getFunction: (params?: Record<string, any>) => Promise<[U, null] | [null, any]>,
  clearFunction: () => void,
  loaderRef: React.RefObject<HTMLDivElement | null>
): UseLoadWithPaginationReturn<T> => {

  const stateData = useDataReducer();
  const searchParams = useSearchParams();

  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const hasMore = useRef<boolean>(true);

  const isFetchingRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const shouldCheckManuallyRef = useRef<boolean>(true);

  const { ref: inViewRef, inView, entry } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (!!entry && !entry.isIntersecting && shouldCheckManuallyRef.current) {
      shouldCheckManuallyRef.current = false;
    }
  }, [entry]);

  useEffect(() => {
    if (loaderRef.current) {
      inViewRef(loaderRef.current);
    }
  }, [loaderRef.current]);

  const getMore = useCallback(async () => {
    if (!hasMore.current) return;

    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setError(null);
    setLoading(true);

    const params = {
      limit: PAGE_SIZE,
      skip: stateData.skip + PAGE_SIZE,
      ...(Object.fromEntries(searchParams.entries()))
    };
    const [newData, err] = await getFunction(params);

    if (newData) {
      if (isMountedRef.current) {
        if (newData.total <= newData.skip + PAGE_SIZE) {
          hasMore.current = false;
        }
      }

    } else if (err) {
      if (isMountedRef.current) {
        setError(err);
      }
    }

    if (isMountedRef.current) {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [getFunction, searchParams, stateData]);

  // fires when loader visibility changes after scrolling
  useEffect(() => {
    isMountedRef.current = true;
    inView && !shouldCheckManuallyRef.current && getMore();

    return () => {
      isMountedRef.current = false;
    };
  }, [inView]);

  // fires when user screen is too big and loader is visible without scrolling
  useEffect(() => {
    if (
      loaderRef.current &&
      loaderRef.current.getBoundingClientRect().bottom <= window.innerHeight &&
      hasMore.current &&
      !loading &&
      !error &&
      shouldCheckManuallyRef.current
    ) {
      getMore();
    }
  }, [loading, getMore]);

  // fires when search params have changed
  useLazyEffect(() => {
    shouldCheckManuallyRef.current = true;
    hasMore.current = true;
    clearFunction();
  }, [searchParams.toString()]);

  return [stateData, error, loading, hasMore.current, getMore];
};
