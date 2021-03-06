import React, { Component } from "react";
import { Route } from 'react-router';
import "./App.css";
import MovieCreator from "./components/movies/movie-creator/MovieCreator";
import MovieUpdaterList from "./components/movies/movie-update-list/MovieUpdaterList";
import Register from "./components/register/Register";
import MovieUpdater from "./components/movies/movie-update/MovieUpdater";
import { LogIn } from "./components/authentication/LogIn";
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieSearch from "./components/movies/movie-search/MovieSearch";
import MovieInfo from "./components/movies/movie-info/MovieInfo";
import MovieRecommendations from "./components/movies/movie-recommendations/MovieRecommendations";


export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
      <div>
        <Route exact path='/' component={LogIn} />
        <Route path='/register' component={Register} />
        <Route path='/updateMovie' component={MovieUpdaterList} />
        <Route path='/createMovie' component={MovieCreator} />
        <Route path='/mvSearch' component={MovieSearch} />
        <Route path='/mvRecommendations' component={MovieRecommendations} />
        <Route path='/movieinfo/:id' component={MovieInfo} />
        <Route path='/movieupdate/:id' component={MovieUpdater} />
      </div>
    );
  }
}
