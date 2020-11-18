import { Genre } from "../models/genre";
import { Language } from "../models/language";
import { MovieData } from "../models/movie-data";
import { Style } from "../models/style";
import * as Constants from '../constants';
import axios, { AxiosResponse } from 'axios';
import { Image } from "../models/image";
import { IReview } from "../models/review";

export class MovieService {
  private static URL = `${Constants.apiUrl}movie`;

  public static async getStyles(): Promise<AxiosResponse<Style[]>> {
    return axios.get(`${this.URL}/styles`);
  }
  public static async getGenres(): Promise<AxiosResponse<Genre[]>> {
    return axios.get(`${this.URL}/genres`);
  }
  public static async getLanguages(): Promise<AxiosResponse<Language[]>> {
    return axios.get(`${this.URL}/languages`);
  }
  public static getMovies(): Promise<MovieData[]> {
    return
  }
  public static async getMovieById(id: number): Promise<AxiosResponse<MovieData>> {
    return axios.get(`${this.URL}/moviebyid/${id}`);
  }
  public static async getMoviesFromUser(userId: number): Promise<AxiosResponse<MovieData[]>> {
    return axios.get(`${this.URL}/user/${userId}`);
  }
  public static async createMovie(movie: MovieData): Promise<AxiosResponse<MovieData>> {
    return axios.post(this.URL, movie);
  }
  public static createImage(image: FormData): Promise<AxiosResponse<Image>> {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(`${this.URL}/image`, image, config);
  }
  public static getMovieScore(movieId: number): Promise<AxiosResponse<number>> {
    return axios.get(`${this.URL}/score/${movieId}`);
  }
  public static getMoviePopularity(movieId: number): Promise<AxiosResponse<number>> {
    return axios.get(`${this.URL}/popularity/${movieId}`);
  }
  public static updateMovieById(movie: MovieData): Promise<AxiosResponse<MovieData>> {
    console.log(movie);
    return axios.post(`${this.URL}/update`, movie);
  }

  public static async getMovieData(): Promise<AxiosResponse<MovieData[]>> {
    return axios.get(`${this.URL}/moviedata`)
  }
  public static getImageUrl(id: string): string {
    return this.URL + "/movieimages/" + id;
  }

  public static async postReview(review: IReview):Promise<AxiosResponse<IReview>>{
    return axios.post(`${this.URL}/review`,review);
}

  public static async getReview(id: number): Promise<AxiosResponse<IReview[]>> {
    return axios.get(`${this.URL}/review/`+ id);
  }
}