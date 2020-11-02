export class User {
    constructor(
        public name: string = '',
        public lastname: string = '',
        public email: string = '',
        public password: string = '',
        public idUser: number = 1
    ) { }

    public static get Empty(): User { return new User() }
    public static local: User = User.Empty;

}
