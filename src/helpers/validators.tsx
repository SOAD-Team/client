import { MovieData } from "../models/movie-data";

export class Validators{
    static validateMovie(movie: MovieData): boolean{
        let val: boolean = true;
        if(this.validateEmpty(movie.genres)){
            alert('Please Choose a Genre')
            val = false;
        }
        else if(this.validateEmpty(movie.languages)){
            alert('Please Choose a Language')
            val = false;
        }
        else if(this.validateEmpty(movie.styles)){
            alert('Please Choose a Genre')
            val = false;
        }
        return val;
    }
    static validateEmpty(list: any[]): boolean{
        return list.length <= 0;
    }
}