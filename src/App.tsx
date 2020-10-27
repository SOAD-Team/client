import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/core/layout/Layout';
import { Home } from './components/home/Home'
import { MovieList } from './components/MovieList';
import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/movieList' component={MovieList} />
      </Layout>
    );
  }
}
