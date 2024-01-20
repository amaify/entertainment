import { useEffect, useRef } from "react";
import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";

interface Props<T> {
  fetchNextPage: (
    value?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<T[], unknown>, Error>>;

  hasNextPage: boolean;
}

export default function useIntersectionObserver<T extends any>({ fetchNextPage, hasNextPage }: Props<T>) {
  const observerElement = useRef<HTMLDivElement | null>(null);

  // console.log(!!observerElement);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerElement.current && hasNextPage) {
      observer.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) {
        observer.unobserve(observerElement.current);
      }
    };
  }, [observerElement, hasNextPage]);

  return { observerElement };
}
