export function getYear(date: string) {
    const [year] = date.split("-");
    return year;
}

export function convertMinsToHrsMins(mins: number) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
}

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
    vote_average: number;
    number_of_seasons: number;
    networks: Array<{ id: number; logo_path: string; name: string }>;
    production_countries: Array<{ name: string }>;
    genres: { id: number; name: string }[];
}
