import logo from '../assets/images/movie-template.png';

export class Image{
    constructor(
        public id?: number,
        public objectImage: FormData = null,
        public url: string = logo
    ){ }
    
    public static get Empty(): Image{return new Image()}
}