import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/core/layout/Layout';
import { Home } from './components/home/Home'
import "./App.css";
import MovieCreator from "./components/movies/movie-creator/MovieCreator";
import MovieUpdater from "./components/movies/movie-update/MovieUpdater";
import Register from "./components/register/Register";
import { LogIn } from "./components/LogIn";
import { Container } from "reactstrap";
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
      </div>
    );
  }
}
