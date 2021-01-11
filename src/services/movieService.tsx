import { Movie } from "../models/movie";
import axios, { AxiosResponse } from 'axios';
import { Service } from "./service";
export class MovieService extends Service<Movie> {

  static instance: MovieService = null;

  private constructor(){
      super('movie');
  }

  public static Singleton() : MovieService{
      if(!this.instance)
          this.instance = new MovieService();
      return this.instance;
  }

  public async getFromUser(userId: number): Promise<AxiosResponse<Movie[]>> {
    return axios.get(`${this.url}/user/${userId}`);
  }
}