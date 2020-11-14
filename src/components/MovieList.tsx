import React, { Component } from 'react';
import { Container } from 'reactstrap';
import * as Constants from './../constants'
import { NavMenu } from './NavMenu';


export class MovieList extends Component {
  static displayName = MovieList.name;
  state : any;

  constructor(props: any) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderForecastsTable(forecasts: any) {
    return (
      
        <p>{forecasts}</p>
    );
  }

  render() {

    let contents : any = this.state.loading
      ? <p><em>Loading...</em></p>
      : MovieList.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <NavMenu />
        <Container>
        <h1 id="tabelLabel" >Movie List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        </Container>
      </div>
    );
  }

  async populateData() {
    const response = await fetch(Constants.apiUrl +  'movie');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}