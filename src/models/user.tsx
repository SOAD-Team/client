export class User {
  constructor(
    public name: string = '',
    public lastName: string = '',
    public email: string = '',
    public password: string = '',
    public idUser?: number
  ) {}


    public static get Empty(): User {
      const user = new User();
      user.idUser = 1;
      return user; 
    }
    public static local: User = User.Empty;
}
