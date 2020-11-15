import React, { Component } from "react";
import { Route } from 'react-router';
import { Home } from './components/home/Home'
import "./App.css";
import MovieCreator from "./components/movies/movie-creator/MovieCreator";
import MovieUpdater from "./components/movies/movie-update/MovieUpdater";
import Register from "./components/register/Register";
import { LogIn } from "./components/authentication/LogIn";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <Route path='/home' component={Home} />
        <Route exact path='/' component={LogIn} />
        <Route path='/register' component={Register} />
        <Route path='/updateMovie' component={MovieUpdater} />
        <Route path='/createMovie' component={MovieCreator} />
        <Route path='/mvSearch' component={MovieSearch} />
      </div>
    );
  }
}
