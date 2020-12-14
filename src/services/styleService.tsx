import axios, { AxiosResponse } from 'axios';
import * as Constants from '../constants';
import { Style } from '../models/style';

export class StyleService{
    private static URL = `${Constants.apiUrl}style`;

    public static async getAll(): Promise<AxiosResponse<Style[]>> {
        return axios.get(this.URL);
    }
}