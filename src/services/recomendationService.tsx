import * as Constants from '../constants'
import axios, { AxiosResponse } from 'axios';
import { IRecommendation } from '../models/recommendation';
import { UserPoints } from '../models/userPoints';

export class RegisterService {
    private static URL = `${Constants.apiUrl}recommendation`;

    public static getMovieRecommendation(imdb: number, metaScore: number, community: number, platFav: number, popularity: number): Promise<AxiosResponse<IRecommendation>> {
        const points: UserPoints = {
            imdb,
            metaScore,
            community,
            platFav,
            popularity
        }
        return axios.post(this.URL, points);
    }
}