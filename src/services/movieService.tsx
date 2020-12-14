import { Movie } from "../models/movie";
import * as Constants from '../constants';
import axios, { AxiosResponse } from 'axios';
export class MovieService {
  private static URL = `${Constants.apiUrl}movie`;
  
  public static async post(movie: Movie): Promise<AxiosResponse<Movie>> {
    return axios.post(this.URL, movie);
  }
  public static async getAll(): Promise<AxiosResponse<Movie[]>> {
    return axios.get(`${this.URL}/moviedata`)
  }

  public static async getFromUser(userId: number): Promise<AxiosResponse<Movie[]>> {
    return axios.get(`${this.URL}/user/${userId}`);
  }

  public static async get(id: number): Promise<AxiosResponse<Movie>> {
    return axios.get(`${this.URL}/moviebyid/${id}`);
  }

  public static async put(movie: Movie): Promise<AxiosResponse<Movie>> {
    return axios.put(`${this.URL}/update`, movie);
  }
  // public static getMovieScore(movieId: number): Promise<AxiosResponse<number>> {
  //   return axios.get(`${this.URL}/score/${movieId}`);
  // }
  // public static getMoviePopularity(movieId: number): Promise<AxiosResponse<number>> {
  //   return axios.get(`${this.URL}/popularity/${movieId}`);
  // }
}