import Image from "next/image";
import { getImageUrl } from "@/helpers/get-shows";
import type { ShowDetails } from "./modal";
import ModalSkeleton from "./modal-skeleton";
import { convertMinsToHrsMins, getYear } from "./modal-utils";

interface Props {
  showDetails: ShowDetails | undefined;
  variant: "movie" | "tv";
  isLoading: boolean;
  error: Error | null;
}

export default function ModalContent({ showDetails, variant, isLoading, error }: Props) {
  if (isLoading) return <ModalSkeleton />;

  if (error) return <h1 className="text-heading-lg text-primary-background">{error.message}</h1>;

  if (showDetails) {
    return (
      <div className="flex gap-8">
        <div className="min-h-[43rem] w-1/3">
          <Image
            src={getImageUrl({ variant: "desktop", path: showDetails.poster_path })}
            alt={showDetails.title || showDetails?.name}
            width={500}
            height={500}
            loading="lazy"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM83jz5PwAG1ALeWannmwAAAABJRU5ErkJggg=="
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <div className="flex w-[70%] flex-col gap-5">
          <div>
            <h1 className="text-heading-lg">
              {showDetails.title || showDetails.name}{" "}
              <span className="opacity-60">({getYear(showDetails.release_date || showDetails?.first_air_date)})</span>
            </h1>
            <div className="modal-subheading text-body-sm">
              <span>{showDetails.genres.map((genre) => genre.name).join(", ")}</span>
              {variant === "movie" && <span>{convertMinsToHrsMins(showDetails.runtime)}</span>}
            </div>
          </div>
          <div>
            <h2 className="text-heading-medium-sm">Overview</h2>
            <p className="text-body-md">{showDetails.overview}</p>
          </div>
          <p className="text-heading-light-sm italic">{showDetails.tagline}</p>
        </div>
      </div>
    );
  }
}
