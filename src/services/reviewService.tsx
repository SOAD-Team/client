import { IReview } from '../models/review';
import { Service } from './service';
import axios, { AxiosResponse } from 'axios';

export class ReviewService extends Service<IReview>{
    static instance: ReviewService = null;

    private constructor(){
        super('review');
    }

    public static Singleton() : ReviewService{
        if(!this.instance)
            this.instance = new ReviewService();
        return this.instance;
    }

    public async getByMovie(id: number): Promise<AxiosResponse<IReview[]>>{
        return axios.get(`${this.url}/${id}`);
    }
}