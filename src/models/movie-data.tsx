import { Genre } from "./genre";
import { Image } from "./image";
import { Language } from "./language";
import { Style } from "./style";

export class MovieData {
    constructor(
        public idMovieData?: number,
        public idMovie?: number,
        public registerDate: Date = new Date(),
        public name: string = '',
        public year: string = '1900',
        public genres: Genre[] = [],
        public languages: Language[] = [],
        public platFav: boolean = false,
        public image: Image = Image.Empty,
        public styles: Style[] = [],
        public metaScore?: number,
        public imdb?: number) { }

    public static get Empty(): MovieData { return new MovieData() };

}