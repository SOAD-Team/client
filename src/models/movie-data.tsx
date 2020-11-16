import { Genre } from "./genre";
import { Image } from "./image";
import { Language } from "./language";
import { Style } from "./style";
import { User } from "./user";

export class MovieData {
    constructor(
        public idUser: number = User.local.idUser,
        public idMovieData?: number,
        public idMovie?: number,
        public registerDate: Date = new Date(),
        public name: string = '',
        public title: string = '',
        public year: number = 1900,
        public genres: Genre[] = [],
        public languages: Language[] = [],
        public platFav: boolean = false,
        public image: Image = Image.Empty,
        public styles: Style[] = [],
        public director: string = "",
        public movieDataLanguage: Language[] = [],
        public movieDataGenre: Genre[] = [],
        public metaScore?: number,
        public imdb?: number,
        public community?: number,
        public favorite?: number,
        public popularity?: number,
        public imageMongoId?: string
        ) { }

    public static get Empty(): MovieData { return new MovieData() }

}