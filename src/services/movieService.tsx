import { resolve } from "dns";
import { IGenre } from "../models/genre";
import { ILanguage } from "../models/language";
import { MovieData } from "../models/movie-data";
import { IStyle } from "../models/style";

export class MovieService {
  static getStyles(): Promise<IStyle[]> {
    return new Promise((resolve) => {
      resolve([{idStyle: 1, name: 'NoMoreBanana'}])
    });
  }
  public static getGenres(): Promise<IGenre[]> {
    return new Promise((resolve) => {
      resolve([{idGenre: 1, name: 'Banana'}])
    });
  }
  public static getLanguages(): Promise<ILanguage[]>{
    return new Promise((resolve) => {
      resolve([{idLanguage: 1, name: 'NotBanana'}]);
    });
  }
  public static getMovies (): Promise<MovieData[]>{
    return
  }
  public static getMovieById(id: number): Promise<MovieData>{
    return;
  }
  public static createMovie(movie: MovieData): Promise<MovieData>{
    return
  }
  public static updateMovieById(id: number): Promise<MovieData>{
    return
  }
  public static deleteMovieById(id: number): Promise<MovieData>{
    return
  }
}
