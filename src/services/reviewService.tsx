import * as Constants from '../constants'
import axios, { AxiosResponse } from 'axios';
import { IReview } from '../models/review';

export class ReviewService {
    private static URL = `${Constants.apiUrl}review`;
    
    public static async post(review: IReview): Promise<AxiosResponse<IReview>> {
        return axios.post(this.URL, review);
    }

    public static async get(id: number): Promise<AxiosResponse<IReview[]>> {
        return axios.get(this.URL + id);
    }
}