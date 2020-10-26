import React, { Component } from 'react';
import * as Constants from './../constants'

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
        <h1 id="tabelLabel" >Movie List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateData() {
    const response = await fetch(Constants.apiUrl +  'movie');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}