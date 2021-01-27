import React from 'react';
import MovieInfo from './MovieInfo';
import {shallow} from 'enzyme';
import { MovieService } from '../../../services/movieService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';
import { Movie } from '../../../models/movie';

describe('MovieInfo', () => {

    let component: MovieInfo;

    beforeEach(() => {
        component = shallow(<MovieInfo/>);
    });

    it('should create', () => {
        spyOn(MovieService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<Movie[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })

        
        expect(component).toBeTruthy();
    });
})