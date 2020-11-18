import { MovieData } from '../../../models/movie-data';
import { MovieService } from '../../../services/movieService'
import * as Constants from '../../../constants';
import MovieForm, { IValue }from '../movie-form/movieForm';
import { Validators } from '../../../helpers/validators';
import { Image } from '../../../models/image';
export default class MovieUpdater extends MovieForm {

    id: number;
    URL: string = `${Constants.apiUrl}movie`;
    initialImageId: string;
    initialMovieId: number;

    constructor(props) {
        super(props);

        this.title = "Update a Movie!";
        this.id = props.match.params.id;

        this.state = {
            value: MovieData.Empty,
            loading: true,
        };
    }

    async loadData() {
        super.loadData();

        const fd: FormData = new FormData();

        const movieValue: MovieData = (await MovieService.getMovieById(this.id)).data;

        console.log(movieValue);

        movieValue.image =
        {
            ...movieValue.image,
            objectImage: fd,
            url: MovieService.getImageUrl(movieValue.image.id)
        }

        this.initialImageId = movieValue.image.id;
        this.initialMovieId = movieValue.idMovieData;

        this.setState({ ...this.state, value: movieValue, loading: false });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const movie: MovieData = this.state.value;
            if (movie.idMovieData !== this.initialMovieId) {
                movie.registerDate = new Date();
                if (Validators.validateMovie(movie)) {
                    movie.imageMongoId = this.initialImageId.toString();
                    if (this.state.value.image.id !== this.initialImageId) {
                        const image: Image = (await MovieService.createImage(movie.image.objectImage)).data;
                        console.log(image);
                        movie.image = image;
                    }

                    MovieService.updateMovieById(movie).then(res => {
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