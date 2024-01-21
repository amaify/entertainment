import { useEffect, useState } from "react";
import useMediaQuery from "./use-media-query";

export default function useScrollToTop() {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  let scrollContainer = null;
  if (typeof window !== "undefined") {
    scrollContainer = isDesktop ? document.querySelector("#showsColumn") : document.querySelector("html");
  }

  const handleScroll = () => {
    if (scrollContainer && scrollContainer.scrollTop > 1500) {
      setShowBackToTopButton(true);
      return;
    }

    setShowBackToTopButton(false);
  };

  const onBackToTopButtonClick = () => {
    scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollListener = isDesktop ? document.querySelector("#showsColumn") : window;

    scrollListener?.addEventListener("scroll", handleScroll);

    return () => {
      scrollListener?.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop]);

  return {
    showBackToTopButton,
    onBackToTopButtonClick
  };
}
