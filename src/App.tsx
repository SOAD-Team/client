import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'
import { MovieList } from './components/MovieList';
import "./App.css";
import { LogIn } from "./components/LogIn";
import { Container } from "reactstrap";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/movieList' component={MovieList} />
        <Route path='/login' component={LogIn} />
       
      </div>
    );
  }
}
