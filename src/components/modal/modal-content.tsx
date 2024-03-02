import Image from "next/image";
import { getImageUrl } from "@/helpers/get-shows";
import type { ShowDetails } from "./modal";
import ModalSkeleton from "./modal-skeleton";
import { convertMinsToHrsMins, getYear } from "./modal-utils";
import Typography from "../typography/typography";

interface Props {
  showDetails: ShowDetails | undefined;
  variant: "movie" | "tv";
  isLoading: boolean;
  error: Error | null;
}

export default function ModalContent({ showDetails, variant, isLoading, error }: Props) {
  if (isLoading) return <ModalSkeleton />;

  if (error)
    return (
      <Typography as="h1" intent="fluid-heading" className="!text-primary-background">
        {error.message}
      </Typography>
    );

  if (showDetails) {
    return (
      <div className="flex gap-8">
        <div className="min-h-[43rem] w-1/3">
          <Image
            src={getImageUrl({ variant: "original", path: showDetails.poster_path })}
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
            <Typography as="h1" intent="fluid-heading" className="!text-primary-background">
              {showDetails.title || showDetails.name}{" "}
              <span className="opacity-60">({getYear(showDetails.release_date || showDetails?.first_air_date)})</span>
            </Typography>
            <div className="modal-subheading text-body-sm">
              <span>{showDetails.genres.map((genre) => genre.name).join(", ")}</span>
              {variant === "movie" && <span>{convertMinsToHrsMins(showDetails.runtime)}</span>}
            </div>
          </div>
          <div>
            <Typography as="h2" intent="heading-medium-sm" className="!text-primary-background">
              Overview
            </Typography>
            <Typography as="p" intent="body-md" className="!text-primary-background">
              {showDetails.overview}
            </Typography>
          </div>
          <Typography as="p" intent="heading-light-sm" className="italic !text-primary-background">
            {showDetails.tagline}
          </Typography>
        </div>
      </div>
    );
  }
}
