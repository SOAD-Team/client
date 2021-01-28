import React from 'react';
import MovieForm from './movieForm';
import {shallow} from 'enzyme';
import { MovieService } from '../../../services/movieService';
import { ImageService } from '../../../services/imageService';
import { AxiosResponse } from 'axios';
import { Style } from '../../../models/style';
import { Language } from '../../../models/language';
import { Movie } from '../../../models/movie';
import { Image } from '../../../models/image';

describe('MovieForm', () => {

    let component: MovieForm;

    beforeEach(() => {
        component = shallow(<MovieForm/>);
    });

    it('should create', () => {
        spyOn(MovieService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<Movie[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })

        spyOn(ImageService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<Image>;
            res.data = null;
            return new Promise((resolve)=> {
                resolve(res);
            })
        })

        
        expect(component).toBeTruthy();
    });
})