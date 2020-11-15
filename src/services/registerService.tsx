import * as Constants from '../constants'
import { User } from "../models/user";
import axios, {AxiosResponse} from 'axios';
import { promises } from 'dns';

export class RegisterService {
  private static URL = Constants.apiUrl;

  public static async logIn(email:string, password:string):Promise<AxiosResponse<User>>{
    return axios.post(`${this.URL}registeruser/login`,{email, password});
    

  }


  public static async postUserInfo(user : User){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
  
      const response = await fetch(Constants.apiUrl + "registeruser", requestOptions);
      const data = await response.json();

      return data;
  }



}
