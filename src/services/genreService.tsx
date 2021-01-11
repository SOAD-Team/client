import { Genre } from "../models/genre";
import { Service } from './service';

export class GenreService extends Service<Genre>{
    private static instance: GenreService = null;

    private constructor(){
        super('genre');
    }

    public static Singleton() : GenreService{
        if(!this.instance)
            this.instance = new GenreService();
        return this.instance;
    }
}