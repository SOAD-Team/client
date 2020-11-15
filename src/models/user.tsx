export class User {
  constructor(
    public Name: string = '',
    public LastName: string = '',
    public Email: string = '',
    public Password: string = '',
    public IdUser?: number
  ) {}


    public static get Empty(): User {
      const user = new User();
      user.IdUser = 1;
      return user; 
    }
    public static local: User = User.Empty;

}
