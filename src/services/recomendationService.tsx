import * as Constants from '../constants'
import axios, { AxiosResponse } from 'axios';
import { IRecommendation } from '../models/recommendation';
import { UserPoints } from '../models/userPoints';

export class RecommendationsService {
    private static URL = `${Constants.apiUrl}recommendation`;

    public static get(points: UserPoints): Promise<AxiosResponse<IRecommendation[]>> {
        return axios.get(this.URL, { params: {points}});
    }
}