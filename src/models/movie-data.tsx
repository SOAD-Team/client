import { Image } from "./image";

export class MovieData {
    constructor(
        public idMovieData?: number,
        public idMovie?: number,
        public registerDate: Date = new Date(),
        public name: string = '',
        public year: string = '1900',
        public idGenre: number = 0,
        public idLanguage: number = 0,
        public platFav: boolean = false,
        public image: Image = Image.Empty,
        public idStyle: number = 0,
        public metaScore?: number,
        public imdb?: number) { }

    public static get Empty(): MovieData { return new MovieData() };

}