import { clsx } from "clsx";
import Image from "next/image";
import useMediaQuery from "@/app/hooks/use-media-query";
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
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  if (isLoading) return <ModalSkeleton />;

  if (error)
    return (
      <Typography as="h1" intent="fluid-heading" className="!text-primary-background">
        {error.message}
      </Typography>
    );

  if (showDetails) {
    return (
      <div className="flex flex-col gap-8 md:flex-row">
        <div className={clsx("h-[30rem] w-full", "md:h-auto md:min-h-[43rem] md:w-1/3")}>
          <Image
            src={getImageUrl({
              variant: "original",
              path: !isTablet ? showDetails.backdrop_path : showDetails.poster_path
            })}
            alt={showDetails.title || showDetails?.name}
            width={500}
            height={700}
            loading="lazy"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM83jz5PwAG1ALeWannmwAAAABJRU5ErkJggg=="
            className="size-full object-cover md:rounded-xl"
          />
        </div>
        <div className="flex w-full flex-col gap-5 px-10 pb-12 md:w-[70%] md:px-0 md:pb-0">
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
              {showDetails.overview !== "" ? showDetails.overview : "No overview available"}
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
