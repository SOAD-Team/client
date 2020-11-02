import React from 'react';
import MovieCreator from './MovieCreator';
import {shallow} from 'enzyme';
import { MovieService } from '../../../services/movieService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';

describe('MovieCreator', () => {

    let component: MovieCreator;

    beforeEach(() => {
        component = shallow(<MovieCreator/>);
    });

    it('should create', () => {
        const spyS = spyOn(MovieService, 'getStyles').and.callFake(() => {
            let res: AxiosResponse<Style[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        const spyL = spyOn(MovieService, 'getLanguages').and.callFake(() => {
            let res: AxiosResponse<Language[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        const spyG = spyOn(MovieService, 'getGenres').and.callFake(() => {
            let res: AxiosResponse<Genre[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        expect(component).toBeTruthy();
    });
})