import React from 'react';
import MovieCreator from './MovieCreator';
import {shallow} from 'enzyme';
import { MovieService } from '../../../services/movieService';
import { StyleService } from '../../../services/styleService';
import { LanguageService } from '../../../services/languageService';
import { GenreService } from '../../../services/genreService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';
import { Service } from '../../../services/service';

describe('MovieCreator', () => {

    let component: MovieCreator;

    beforeEach(() => {
        component = shallow(<MovieCreator/>);
    });

    it('should create', () => {
        spyOn(Service.prototype, 'getAll').and.callFake(() => {
            let res: AxiosResponse<Style[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        spyOn(Service.prototype, 'getAll').and.callFake(() => {
            let res: AxiosResponse<Language[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        spyOn(Service.prototype, 'getAll').and.callFake(() => {
            let res: AxiosResponse<Genre[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
        expect(component).toBeTruthy();
    });
})