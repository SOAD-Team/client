import { MovieData } from '../../../models/movie-data';
import MovieForm from '../movie-form/movieForm';
export default class MovieCreator extends MovieForm{

  constructor(props) {
    super(props);

    this.title = "Create a Movie!";

    this.state = {
      value: MovieData.Empty,
      loading: true,
    };
  }

  async loadData()
  {
    super.loadData();
    this.setState({ ...this.state, loading: false });
  }
}