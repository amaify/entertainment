"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/helpers/get-shows";
import ShowDetails from "./movie-details.json";
import SvgIcon from "../svg/svg";
// import useCustomQuery from "@/app/hooks/use-custom-query";
// import Button from "./button";

interface ShowDetails {
  title: string;
  overview: string;
  tagLine: string;
}

function getYear(date: string) {
  const [year] = date.split("-");
  return year;
}

function convertMinsToHrsMins(mins: number) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const showModal = searchParams.get("id");
  const showDetails = ShowDetails;

  const handlCloseModal = () => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("id");
    queryParams.delete("category");
    router.replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  // const { data, isLoading, error } = useCustomQuery({ queryKey: ["show-details"], queryFn: () => {} });

  return (
    <Dialog open={!!showModal} onClose={handlCloseModal}>
      <Dialog.Backdrop className="fixed inset-0 z-20 bg-black/50 backdrop-blur" onClick={handlCloseModal} />
      <Dialog.Panel className="fixed left-1/2 top-1/2 z-30 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-10 py-12">
        <button className="absolute right-10 top-8" onClick={handlCloseModal}>
          <SvgIcon variant="closeIcon" />
        </button>
        <div className="flex gap-8">
          <div className="min-h-[43rem] w-1/3">
            <Image
              src={getImageUrl({ variant: "desktop", path: showDetails.poster_path })}
              alt={showDetails.title}
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="flex w-[70%] flex-col gap-5">
            <div>
              <h1 className="text-heading-lg">
                {showDetails.title} <span className="opacity-60">({getYear(showDetails.release_date)})</span>
              </h1>
              <div className="modal-subheading text-body-sm">
                <span>{showDetails.genres.map((genre) => genre.name).join(", ")}</span>
                <span>{convertMinsToHrsMins(showDetails.runtime)}</span>
              </div>
            </div>
            <div>
              <h2 className="text-heading-medium-sm">Overview</h2>
              <p className="text-body-md">{showDetails.overview}</p>
            </div>
            <p className="text-heading-light-sm italic">{showDetails.tagline}</p>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
