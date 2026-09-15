import { useCallback, useSyncExternalStore } from "react";

type ScreenSize = "640px" | "768px" | "1280px";
interface Props {
    query: `(min-width: ${ScreenSize})`;
}

export default function useMediaQuery({ query }: Props) {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const media = window.matchMedia(query);
            media.addEventListener("change", onChange);
            return () => media.removeEventListener("change", onChange);
        },
        [query],
    );

    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false,
    );
}
