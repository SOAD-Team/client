import { User } from "../models/user";
import { Service } from './service';

export class UserService extends Service<User>{
  static instance: UserService = null;

  private constructor(){
      super('user');
  }

  public static Singleton() : UserService{
      if(!this.instance)
          this.instance = new UserService();
      return this.instance;
  }
}
