import React from 'react';
import MovieSearch from './MovieSearch';
import {shallow} from 'enzyme';
import { ReviewService } from '../../../services/reviewService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';
import { IReview } from '../../../models/review';

describe('MovieSearch', () => {

    let component: MovieSearch;

    beforeEach(() => {
        component = shallow(<MovieSearch/>);
    });

    it('movie search', () => {
        spyOn(ReviewService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<IReview[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })

        
        expect(component).toBeTruthy();
    });
})