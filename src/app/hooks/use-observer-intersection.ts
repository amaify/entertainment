import { useEffect, useRef } from "react";
import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface Props<T> {
  fetchNextPage: (
    value?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<T[], unknown>, Error>>;

  hasNextPage: boolean;
}

export default function useIntersectionObserver<T extends any>({ fetchNextPage, hasNextPage }: Props<T>) {
  const observerElement = useRef<HTMLDivElement | null>(null);
  const searchParms = useSearchParams().get("show");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !searchParms) fetchNextPage();
      },
      { threshold: 1 }
    );

    if (observerElement.current && hasNextPage && !searchParms) {
      observer.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) {
        observer.unobserve(observerElement.current);
      }
    };
  }, [observerElement, hasNextPage, searchParms]);

  return { observerElement };
}
