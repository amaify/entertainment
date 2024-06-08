import { useEffect, useState } from "react";

type ScreenSize = "640px" | "768px" | "1280px";
interface Props {
  query: `(min-width: ${ScreenSize})`;
}
export default function useMediaQuery({ query }: Props) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    media.addEventListener("change", () => setMatches(media.matches));

    return () => {
      media.removeEventListener("change", () => setMatches(media.matches));
    };
  }, [query, matches]);

  return matches;
}
