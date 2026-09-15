export type ShowCategory = "Movie" | "TV Series" | "movie" | "tv";

export interface Show {
    id: number;
    title: string;
    overview: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
    media_type: ShowCategory;
    first_air_date: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}
