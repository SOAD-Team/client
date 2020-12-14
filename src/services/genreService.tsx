import axios, { AxiosResponse } from 'axios';
import { Genre } from "../models/genre";
import * as Constants from '../constants';

export class GenreService {
    private static URL = `${Constants.apiUrl}genre`;

    public static async getAll(): Promise<AxiosResponse<Genre[]>> {
        return axios.get(this.URL);
    }
}