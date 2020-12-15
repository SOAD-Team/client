import { Movie } from '../../../models/movie';
import { MovieService } from '../../../services/movieService'
import * as Constants from '../../../constants';
import MovieForm, { IValue }from '../movie-form/movieForm';
import { Validators } from '../../../helpers/validators';
import { Image } from '../../../models/image';
import { ImageService } from '../../../services/imageService';
export default class MovieUpdater extends MovieForm {

    id: number;
    URL: string = `${Constants.apiUrl}movie`;
    initialImageId: string;
    initialMovieId: number;
    requiresImage:boolean = false;

    constructor(props) {
        super(props);

        this.title = "Update a Movie!";
        this.id = props.match.params.id;

        this.state = {
            value: Movie.Empty,
            loading: true,
            image: new FormData()
        };
    }

    async loadData() {
        super.loadData();

        const movieValue: Movie = (await MovieService.Singleton().get(this.id)).data;

        console.log(movieValue);

        this.initialImageId = movieValue.image.id;
        this.initialMovieId = movieValue.idMovieData;

        this.setState({ ...this.state, value: movieValue, loading: false });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const movie: Movie = this.state.value;
            if (movie.idMovieData !== this.initialMovieId) {
                movie.registerDate = new Date();
                if (Validators.validateMovie(movie)) {
                    if (this.state.value.image.id !== this.initialImageId) {
                        const image: Image = (await ImageService.Singleton().postImage(this.state.image)).data;
                        console.log(image);
                        movie.image = image;
                    }

                    MovieService.Singleton().put(movie).then(res => {
                        console.log(res.data);
                        window.location.href = "/updateMovie";
                    });
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    handleChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;

        const stateValue: IValue = {
            ...this.state,
            value: {
                ...this.state.value,
                idMovieData: null,
                [name]: value
            }
        };
        this.setState(stateValue);
    }
}