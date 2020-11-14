import React, { Component } from "react";
import { Route } from 'react-router';
import { Home } from './components/Home'
import { MovieList } from './components/MovieList';
import "./App.css";
import { LogIn } from "./components/LogIn";
import { SingIn } from "./components/SingIn";
import { Container } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <Route path='/home' component={Home} />
        <Route path='/movieList' component={MovieList} />
        <Route exact path='/' component={LogIn} />
        <Route path='/singIn' component={SingIn} />
       
      </div>
    );
  }
}
