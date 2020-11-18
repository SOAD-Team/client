import * as Constants from '../constants'
import axios, { AxiosResponse } from 'axios';
import { IRecommendation } from '../models/recommendation';
import { UserPoints } from '../models/userPoints';
import { Genre } from '../models/genre';

export class RecommendationsService {
    private static URL = `${Constants.apiUrl}recommendation`;

    public static getRecommendation(points:UserPoints): Promise<AxiosResponse<IRecommendation[]>> {
        return axios.post(this.URL, points);
    }
}