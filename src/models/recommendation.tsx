import { MovieData } from "./movie-data";

export interface IRecommendation{
    movie: MovieData;
    score: number;
}