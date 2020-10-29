import { Genre } from "../models/genre";
import { Language } from "../models/language";
import { MovieData } from "../models/movie-data";
import { Style } from "../models/style";
import * as Constants from '../constants';
import axios, { AxiosResponse } from 'axios'

export class MovieService {
  private static URL = `${Constants.apiUrl}movie`;

  public static async getStyles(): Promise<AxiosResponse<Style[]>> {
    return axios.get(`${this.URL}/styles`);
  }
  public static async getGenres(): Promise<AxiosResponse<Genre[]>> {
    return axios.get(`${this.URL}/genres`);
  }
  public static getLanguages(): Promise<AxiosResponse<Language[]>> {
    return axios.get(`${this.URL}/languages`);
  }
  public static getMovies(): Promise<MovieData[]> {
    return
  }
  public static getMovieById(id: number): Promise<MovieData> {
    return;
  }
  public static createMovie(movie: MovieData): Promise<AxiosResponse<MovieData>> {
    console.log(movie);
    return axios.post(this.URL, movie);
  }
  public static updateMovieById(id: number): Promise<MovieData> {
    return
  }
  public static deleteMovieById(id: number): Promise<MovieData> {
    return
  }
}
