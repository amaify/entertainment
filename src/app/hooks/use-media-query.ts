import { useEffect, useState } from "react";

interface Props {
  query: "(min-width: 1280px)";
}
export default function useMediaQuery({ query }: Props) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");

    if (media.matches !== matches) setMatches(media.matches);

    media.addEventListener("change", () => setMatches(media.matches));

    return () => {
      media.removeEventListener("change", () => setMatches(media.matches));
    };
  }, [query, matches]);

  return matches;
}
