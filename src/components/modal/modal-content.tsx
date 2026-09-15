import { clsx } from "clsx";
import Image from "next/image";
import useCustomQuery from "@/app/hooks/use-custom-query";
import Typography from "@/components/typography/typography";
import { fetchShowDetails, getImageUrl } from "@/helpers/get-shows";
import useMediaQuery from "@/hooks/use-media-query";
import ModalSkeleton from "./modal-skeleton";
import { convertMinsToHrsMins, getYear, type ShowDetails } from "./modal-utils";

interface Props {
    variant: "movie" | "tv";
    showId: string;
}

export default function ModalContent({ showId, variant }: Props) {
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

    const {
        data: showDetails,
        isLoading,
        error,
    } = useCustomQuery<ShowDetails>({
        queryKey: ["show-details", showId, variant],
        queryFn: () => fetchShowDetails({ id: showId ?? "", category: variant }),
        enabled: !!showId,
    });

    if (isLoading) return <ModalSkeleton />;

    if (error || !showDetails) {
        return (
            <Typography as="h1" intent="fluid-heading" className="!text-primary-background">
                {error?.message ?? "Could not get movie/show details"}
            </Typography>
        );
    }

    let seasonText = "Seasons";
    if (showDetails?.number_of_seasons && showDetails.number_of_seasons === 1) {
        seasonText = "Season";
    }

    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <div className={clsx("h-[30rem] w-full", "md:h-auto md:min-h-[43rem] md:w-1/3")}>
                <Image
                    src={getImageUrl({
                        variant: "original",
                        path: !isTablet ? showDetails.backdrop_path : showDetails.poster_path,
                    })}
                    alt={showDetails.title || showDetails?.name}
                    width={500}
                    height={700}
                    placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM83jz5PwAG1ALeWannmwAAAABJRU5ErkJggg=="
                    className="size-full object-cover md:rounded-xl"
                />
            </div>
            <div className="flex w-full flex-col gap-5 px-10 pb-12 md:w-[70%] md:px-0 md:pb-0">
                <div>
                    <Typography as="h1" intent="fluid-heading" className="!text-primary-background">
                        {showDetails.title || showDetails.name}
                        <span className="opacity-60">
                            ({getYear(showDetails.release_date || showDetails?.first_air_date)})
                        </span>
                    </Typography>
                    <div className="modal-subheading text-body-sm">
                        <span>{showDetails.genres.map((genre) => genre.name).join(", ")}</span>
                        {showDetails.number_of_seasons ? (
                            <span>
                                {showDetails.number_of_seasons} {seasonText}
                            </span>
                        ) : null}
                        {variant === "movie" ? <span>{convertMinsToHrsMins(showDetails.runtime)}</span> : null}
                        {showDetails.vote_average ? <span>{showDetails.vote_average.toFixed(1)}</span> : null}
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
                <Typography as="p" intent="heading-light-sm" className="italic !text-primary-background leading-[0.9]">
                    {showDetails.tagline}
                </Typography>
                {showDetails?.production_countries && showDetails.production_countries.length > 0 ? (
                    <div>
                        <Typography as="h2" intent="heading-medium-sm" className="!text-primary-background">
                            Produced In
                        </Typography>
                        <Typography as="p" intent="body-md" className="!text-primary-background">
                            {showDetails.production_countries.map((country) => country.name).join(", ")}
                        </Typography>
                    </div>
                ) : null}
                {showDetails?.networks && showDetails.networks.length > 0 ? (
                    <div>
                        <Typography as="h2" intent="heading-medium-sm" className="!text-primary-background">
                            Now Streaming
                        </Typography>
                        <div className="flex items-center gap-4">
                            {showDetails.networks.map((network) => {
                                return (
                                    <div key={network.id} className="size-20">
                                        <Image
                                            src={getImageUrl({
                                                variant: "original",
                                                path: network.logo_path,
                                            })}
                                            alt={network.name}
                                            width={500}
                                            height={700}
                                            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM83jz5PwAG1ALeWannmwAAAABJRU5ErkJggg=="
                                            className="size-full object-contain"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
