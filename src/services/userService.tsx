import * as Constants from '../constants'
import { User } from "../models/user";
import axios, { AxiosResponse } from 'axios';

export class UserService {
  private static URL = `${Constants.apiUrl}user`;

  public static async put(user: User): Promise<AxiosResponse<User>> {
    return axios.put(this.URL, user);
  }

  public static async post(user: User): Promise<AxiosResponse<User>> {
    return axios.post(this.URL, user);
  }
}
