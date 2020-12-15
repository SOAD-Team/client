import axios, { AxiosResponse } from 'axios';
import { IRecommendation } from '../models/recommendation';
import { UserPoints } from '../models/userPoints';
import { Service } from './service';

export class RecommendationService extends Service<IRecommendation>{
    static instance: RecommendationService = null;

    private constructor(){
        super('recommendation');
    }

    public static Singleton() : RecommendationService{
        if(!this.instance)
            this.instance = new RecommendationService();
        return this.instance;
    }

    public async getAllRecommendations(points: UserPoints): Promise<AxiosResponse<IRecommendation[]>>{
        return axios.put(this.url, points)
    }    
}