import { useEffect, useState } from "react";

export default function useScrollToTop() {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  const handleScroll = () => {
    const scrollableElement = document.querySelector("#showsColumn");

    if (scrollableElement && scrollableElement.scrollTop > 1500) {
      setShowBackToTopButton(true);
      return;
    }

    setShowBackToTopButton(false);
  };

  const onBackToTopButtonClick = () => {
    const scrollableElement = document.querySelector("#showsColumn");
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollableElement = document.querySelector("#showsColumn");

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return {
    showBackToTopButton,
    onBackToTopButtonClick
  };
}
