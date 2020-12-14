import axios, { AxiosResponse } from 'axios';
import * as Constants from '../constants';

export abstract class Service<T>{
    protected url : string;

    protected constructor(name: string){
        this.url = `${Constants.apiUrl}${(name)}`;
        console.log(this.url);
    }
    public async get(id: number | string): Promise<AxiosResponse<T>>{
        return axios.get(`${this.url}${id}`);
    }
    public async getAll(): Promise<AxiosResponse<T[]>>{
        return axios.get(this.url);
    }
    public async post(value: T): Promise<AxiosResponse<T>>{
        return axios.post(this.url, value);
    }
    public async put(value: T): Promise<AxiosResponse<T>>{
        return axios.put(this.url, value);
    }
}