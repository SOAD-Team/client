import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/core/layout/Layout';
import { Home } from './components/home/Home'
import "./App.css";
import MovieCreator from "./components/movies/movie-creator/MovieCreator";
import MovieUpdaterList from "./components/movies/movie-update-list/MovieUpdaterList";
import Register from "./components/register/Register";
import MovieUpdater from "./components/movies/movie-update/MovieUpdater";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/createMovie' component={MovieCreator} />
        <Route path='/updateMovie' component={MovieUpdaterList} />
        <Route path='/register' component={Register} />
        <Route path='/movieUpdate/:movie' component={MovieUpdater} />
      </Layout>
    );
  }
}
