import React, { Component } from 'react';
import './movieCreator.css'
import { IMovieData } from '../../../models/movie-data';

export default class MovieCreator extends Component {

  state: IMovieData;

  constructor(props) {
    super(props);
    this.state = {
      registerDate: new Date(),
      name: '',
      year: '',
      idGenre: 0,
      idLanguage: 0,
      platFav: false,
      image: {
        objectImage: null
      }
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A movie was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div className="component-movie-creator">
        Hello movieCreator
      </div>
    )
  }
}