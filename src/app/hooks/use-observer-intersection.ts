import { useEffect, useRef } from "react";
import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface Props<T> {
  fetchNextPage: (
    value?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<T[], unknown>, Error>>;

  hasNextPage: boolean;
}

export default function useIntersectionObserver<T extends any>({ fetchNextPage, hasNextPage }: Props<T>) {
  let wasLoadmoreButtonVisible = "no";
  if (typeof window !== "undefined") {
    wasLoadmoreButtonVisible = sessionStorage.getItem("wasLoadmoreButtonVisible") ?? "no";
  }
  const pathname = usePathname();
  const observerElement = useRef<HTMLDivElement | null>(null);
  const showLoadMoreButtoon = useRef(false);

  const pathsToUseShowMoreButton = ["/movies", "/series"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
        if (entry.intersectionRatio === 1 && pathsToUseShowMoreButton.includes(pathname)) {
          if (wasLoadmoreButtonVisible === "no") {
            showLoadMoreButtoon.current = true;
            sessionStorage.setItem("wasLoadmoreButtonVisible", "yes");
          }
        }

        if (entry.intersectionRatio === 0 && pathsToUseShowMoreButton.includes(pathname)) {
          showLoadMoreButtoon.current = false;
        }
      },
      { threshold: 1 }
    );

    if (observerElement.current && hasNextPage) {
      observer.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) observer.unobserve(observerElement.current);
      if (wasLoadmoreButtonVisible === "yes") sessionStorage.setItem("wasLoadmoreButtonVisible", "no");
    };
  }, [observerElement, hasNextPage, wasLoadmoreButtonVisible]);

  return { observerElement, showLoadMoreButtoon: showLoadMoreButtoon.current };
}
