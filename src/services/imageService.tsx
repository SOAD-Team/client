import axios, { AxiosResponse } from 'axios';
import { Image } from "../models/image";
import * as Constants from '../constants';

export class ImageService{
    private static URL = `${Constants.apiUrl}image`;

    public static post(image: FormData): Promise<AxiosResponse<Image>> {
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        return axios.post(this.URL, image, config);
    }
}