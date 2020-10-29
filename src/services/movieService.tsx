import { Genre } from "../models/genre";
import { Language } from "../models/language";
import { MovieData } from "../models/movie-data";
import { Style } from "../models/style";
import * as Constants from '../constants';
import axios from 'axios'

export class MovieService {
  private static URL = `${Constants.apiUrl}movie`;

  static getStyles(): Promise<Style[]> {
    return new Promise((resolve) => {
      resolve([{ idStyle: 1, name: 'NoMoreBanana' }])
    });
  }
  public static getGenres(): Promise<Genre[]> {
    return new Promise((resolve) => {
      resolve([{ idGenre: 1, name: 'Banana' }])
    });
  }
  public static getLanguages(): Promise<Language[]> {
    return new Promise((resolve) => {
      resolve([{ idLanguage: 1, name: 'NotBanana' }]);
    });
  }
  public static getMovies(): Promise<MovieData[]> {
    return
  }
  public static getMovieById(id: number): Promise<MovieData> {
    return;
  }
  public static createMovie(movie: MovieData): Promise<MovieData> {
    return axios.post(this.URL, movie);
  }
  public static updateMovieById(id: number): Promise<MovieData> {
    return
  }
  public static deleteMovieById(id: number): Promise<MovieData> {
    return
  }
}
