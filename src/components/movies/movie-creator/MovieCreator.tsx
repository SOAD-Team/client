import { Movie } from '../../../models/movie';
import MovieForm from '../movie-form/movieForm';
export default class MovieCreator extends MovieForm{

  constructor(props) {
    super(props);

    this.title = "Create a Movie!";

    this.state = {
      value: Movie.Empty,
      loading: true,
      image: new FormData()
    };
  }

  async loadData()
  {
    super.loadData();
    this.setState({ ...this.state, loading: false });
  }
}