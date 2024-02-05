"use client";

import { Dialog } from "@headlessui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useCustomQuery from "@/app/hooks/use-custom-query";
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
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const showId = searchParams.get("id") as string;
  const showCategory = searchParams.get("category") as "movie" | "tv";

  const { data, isLoading, error } = useCustomQuery({
    queryKey: [showCategory],
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
      <Dialog.Backdrop className="fixed inset-0 z-20 bg-black/50 backdrop-blur" onClick={handlCloseModal} />
      <Dialog.Panel className="fixed left-1/2 top-1/2 z-30 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-10 py-12">
        <button className="absolute right-10 top-8" onClick={handlCloseModal}>
          <SvgIcon variant="closeIcon" />
        </button>
        <ModalContent showDetails={data} isLoading={isLoading} error={error} variant="movie" />
      </Dialog.Panel>
    </Dialog>
  );
}
