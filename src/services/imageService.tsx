import axios, { AxiosResponse } from 'axios';
import { Image } from "../models/image";
import { Service } from './service';

export class ImageService extends Service<Image>{
  private static instance: ImageService = null;

  private constructor() {
    super('image');
  }

  public static Singleton(): ImageService {
    if (!this.instance)
      this.instance = new ImageService();
    return this.instance;
  }

  public async postImage(image: FormData): Promise<AxiosResponse<Image>> {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(this.url, image, config);
  }
}