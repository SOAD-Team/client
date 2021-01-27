import 'ignore-styles';
import React from 'react';
import {shallow} from 'enzyme';
import { UserService } from '../../services/userService';
import { AxiosResponse } from 'axios';
import { User } from '../../models/user';
import { LogIn } from './LogIn';

describe('LogIn', () => {

    let component: LogIn;

    beforeEach(() => {
        component = shallow(<LogIn/>);
    });

it('should get user', () => {
        spyOn(UserService, 'Singleton').and.callFake(() => {
            let res: AxiosResponse<User[]>;
            res.data = [];
            return new Promise((resolve)=> {
                resolve(res);
            })
        })
    
        expect(component).toBeTruthy();
    });
})
