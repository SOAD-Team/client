import React, { Component } from 'react';
import { Jumbotron, Media } from 'reactstrap';
import { MovieData } from '../../../models/movie-data';
import { MovieService } from '../../../services/movieService';
import './MovieInfo.css'
import * as Constants from '../../../constants';
import { Language } from '../../../models/language';
import { Genre } from '../../../models/genre';
import { NavMenu } from '../../core/navMenu/NavMenu';


interface stateValue {
  value: MovieData;
  loading: boolean;
  id: number;
  languages: string[];
  genres: string[];
}

export default class MovieInfo extends Component {

  state: stateValue;

  URL: string = `${Constants.apiUrl}movie`;


  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loading: false,
      id: props.match.params.id,
      languages: [],
      genres: []
    }
  }

  componentDidMount() {
    console.log(this.state.id);
    this.loadData();
  }

  async loadData() {
    const movie: MovieData = (await MovieService.getMovieById(this.state.id)).data;

    const lang: Language[] = (await MovieService.getLanguages()).data;

    const gen: Genre[] = (await MovieService.getGenres()).data;

    var langNames: string[] = [];

    var genNames: string[] = [];

    for (let movieLang of movie.movieDataLanguage) {
      var foundLang = lang.find(langName => langName.idLanguage === movieLang.idLanguage);
      langNames.push(foundLang.name);
    }

    for (let movieGen of movie.movieDataGenre) {
      var foundGen = gen.find(genName => genName.idGenre === movieGen.idGenre);
      genNames.push(foundGen.name);
    }

    const stateValue: stateValue = {
      ...this.state,
      value: movie,
      languages: langNames,
      genres: genNames,
    }
    this.setState(stateValue);
  }

  getImage(id: string) {
    return this.URL + "/movieimages/" + id;
  }

  getAllLanguages() {
    var languages: string = "";
    this.state.languages.forEach(lang => {
      languages = languages + lang + " ";
    });
    return languages;
  }

  getAllGenres() {
    var genres: string = "";
    this.state.genres.forEach(gen => {
      genres = genres + gen + " ";
    });
    return genres;
  }


  render() {
    return (
      <div>
        <NavMenu />
        <Jumbotron>{this.state.value != null &&
          <div>
            <h1 id="formLabel">{this.state.value.title}</h1>
            <br></br>
            <Media key={this.state.value.idMovie}>
              <Media left top>
                <Media object src={this.getImage(this.state.value.imageMongoId)} alt="new" className="photoInfo" />
              </Media>
              <Media body className="movieInfo">
                Year: {this.state.value.year}
                <Media heading>
                  <br></br>
                </Media>
                <Media body className="movieInfo">
                  Diretor: {this.state.value.director}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Meta Score: {this.state.value.metaScore}
                </Media>
                <Media body>
                  <br></br>
                </Media>
                <Media body>
                  IMBD: {this.state.value.metaScore}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Languages: {this.getAllLanguages()}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Genres: {this.getAllLanguages()}
                </Media>
              </Media>
            </Media>
            <br></br>
          </div>}
        </Jumbotron>
      </div>
    )
  }
}