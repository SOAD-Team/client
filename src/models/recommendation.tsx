import { Movie } from "./movie";

export interface IRecommendation{
    movie: Movie;
    score: number;
}