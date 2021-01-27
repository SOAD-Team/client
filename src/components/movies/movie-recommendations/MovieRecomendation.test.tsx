import React from 'react';
import MovieRecommendations from './MovieRecommendations';
import {shallow} from 'enzyme';
import { RecommendationService } from '../../../services/recomendationService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';
import { IRecommendation } from '../../../models/recommendation';

describe('MovieRecommendations', () => {

    let component: MovieRecommendations;

    beforeEach(() => {
        component = shallow(<MovieRecommendations/>);
    });

    it('should create', () => {
        spyOn(RecommendationService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<IRecommendation[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })

        
        expect(component).toBeTruthy();
    });
})