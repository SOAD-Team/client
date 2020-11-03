import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/core/layout/Layout';
import { Home } from './components/home/Home'
import "./App.css";
import MovieCreator from "./components/movie-creation/movie-creator/MovieCreator";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/createMovie' component={MovieCreator} />
      </Layout>
    );
  }
}
