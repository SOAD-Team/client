export class User {
    public static local: User;
    constructor(
        public name: string = '',
        public lastname: string = '',
        public email: string = '',
        public password: string = '',
        public idUser?: number
    ) { }

    public static get Empty(): User { return new User() };

}