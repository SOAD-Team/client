import { Image } from "./image";

export class MovieData {
    constructor(
        public idMovieData?: number,
        public idMovie?: number,
        public registerDate: Date = new Date(),
        public name: string = '',
        public year: string = '1900',
        public genres: number[] = [],
        public languages: number[] = [],
        public platFav: boolean = false,
        public image: Image = Image.Empty,
        public styles: number[] = [],
        public metaScore?: number,
        public imdb?: number) { }

    public static get Empty(): MovieData { return new MovieData() };

}