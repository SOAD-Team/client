import * as Constants from '../constants'
import { User } from "../models/user";

export class RegisterService {
  private static URL = Constants.apiUrl;


  public static async postUserInfo(user : User){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
  
      const response = await fetch(Constants.restURL + "registeruser", requestOptions);
      const data = await response.json();

      return data;
  }


}
