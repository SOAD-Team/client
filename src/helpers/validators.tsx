import { MovieData } from "../models/movie-data";
import { UserPoints } from "../models/userPoints";

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
            alert('Please Choose a Style')
            val = false;
        }
        return val;
    }
    static validateEmpty(list: any[]): boolean{
        return list.length <= 0;
    }


    static validateRecommendations(points: UserPoints): boolean{
        let val: boolean = true;
        if(points.genre == null){
            alert('Please Choose a Genre')
            val = false;
        }
        if(points.imdb == 0){
            alert('Please Choose a value for IMDB')
            val = false;
        }
        if(points.platFav == 0){
            alert('Please Choose a value for Favorite')
            val = false;
        }
        if(points.popularity == 0){
            alert('Please Choose a value for Populariy')
            val = false;
        }
        if(points.community == 0){
            alert('Please Choose a value for Community')
            val = false;
        }

        if(points.imdb+points.metaScore+points.platFav+points.popularity+points.community!==100){
            alert('The sum of all the categories must give 100')
            val = false;
        }
        
        return val;

    }

}