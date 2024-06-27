"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { clsx } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useCustomQuery from "@/app/hooks/use-custom-query";
import useMediaQuery from "@/app/hooks/use-media-query";
import { fetchShowDetails } from "@/helpers/get-shows";
import ModalContent from "./modal-content";
import SvgIcon from "../svg/svg";

export interface ShowDetails {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  homepage: string;
  name: string;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const showId = searchParams.get("id") as string;
  const showCategory = searchParams.get("category") as "movie" | "tv";

  const { data, isLoading, error } = useCustomQuery({
    queryKey: [showId],
    queryFn: () => fetchShowDetails({ id: showId ?? "", category: showCategory }),
    enabled: !!showId
  });

  const handlCloseModal = () => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("id");
    queryParams.delete("category");
    router.replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={!!showId} onClose={handlCloseModal}>
      <div className="fixed inset-0 z-20 bg-black/50 backdrop-blur" onClick={handlCloseModal} />
      <DialogPanel
        className={clsx(
          "w-[90%] overflow-y-auto rounded-xl bg-white",
          "fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2",
          "md:max-h-full md:min-h-0 md:w-[80%] md:px-10 md:py-12",
          "xl:w-[60%] 2xl:max-w-[128rem]"
        )}
      >
        <div className={clsx("absolute right-10 top-8 z-10")}>
          <button
            className={clsx({
              "flex size-16 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary/60":
                !isMobile
            })}
            onClick={handlCloseModal}
          >
            <SvgIcon variant="closeIcon" />
          </button>
        </div>
        <ModalContent showDetails={data} isLoading={isLoading} error={error} variant={showCategory} />
      </DialogPanel>
    </Dialog>
  );
}
