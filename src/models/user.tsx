export class User {
  constructor(
    public Name: string = '',
    public LastName: string = '',
    public Email: string = '',
    public Password: string = '',
    public IdUser?: number
  ) {}

    public static get Empty(): User { return new User() }
    public static local: User = User.Empty;

}
