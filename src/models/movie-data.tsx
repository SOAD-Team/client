import { IImage } from "./image";

export interface IMovieData{
    idMovieData?: number;
    idMovieHistory?: number;
    registerDate: Date;
    name: string;
    year: string;
    idGenre: number;
    idLanguage: number;
    platFav: boolean;
    image: IImage;
}