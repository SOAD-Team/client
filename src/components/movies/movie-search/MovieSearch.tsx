import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Jumbotron, Media, Row } from 'reactstrap';
import { Movie } from '../../../models/movie';
import { MovieService } from '../../../services/movieService';
import * as Constants from '../../../constants';
import './MovieSearch.css'
import { NavMenu } from '../../core/navMenu/NavMenu';
import { DotLoader } from 'react-spinners';


interface stateValue {
  value: Movie[];
  loading: boolean;
  allData: Movie[];
  selectedId: number;
  searchWord: string;
}


export default class MovieSearch extends Component {

  state: stateValue;

  URL: string = `${Constants.apiUrl}movie`;

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      loading: false,
      selectedId: -1,
      searchWord: "",
      allData: []
    }

    this.loadHandlers();
  }

  loadHandlers(): void {
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {

    const movies: Movie[] = (await MovieService.Singleton().getAll()).data;

    const stateValue: stateValue = {
      ...this.state,
      allData: movies,
      value: movies,
      loading: false
    }
    this.setState(stateValue);
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const stateValue: stateValue = {
      ...this.state,
      searchWord: value,
    };

    this.setState(stateValue);
  }

  handleSearch() {

    this.setState({ ...this.state, loading: true });

    var filtered: Movie[];
    const re = new RegExp(this.state.searchWord, 'i');

    filtered = this.state.allData.filter(movie => Object.values(movie).some(val => typeof val === "string" && val.match(re)));

    const stateValue: stateValue = {
      ...this.state,
      value: filtered
    };

    this.setState(stateValue);
  }

  render() {
    let contents: any = this.state.loading
      ? <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <DotLoader size={100} loading={this.state.loading} />
      </div>
      : this.renderMovies();
    return (
      <div>
        {contents}
      </div>
    )
  }
  renderMovies() {
    return (
      <div>
        <NavMenu />
        <Jumbotron>
          <h1 id="formLabel">Search for a movie!</h1>
          <br></br>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="text"
                    name="Name"
                    id="kwInput"
                    placeholder="Enter Name Keyword"
                    onChange={this.handleChange}
                  />
                  <br></br>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Button onClick={this.handleSearch}>Search</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {this.state.value.map(movie =>
            <div>
              <Media key={movie.idMovie}>
                <Media left top href={"movieinfo/" + movie.idMovie}>
                  <img className="photo" src={movie.image.url} alt="new" />
                </Media>
                <Media body>
                  <Media heading>
                    <a href={"movieinfo/" + movie.idMovie} className="link">{movie.name}</a>
                  </Media>
              Year: {movie.year}
                </Media>
              </Media>
              <br></br>
            </div>)}
        </Jumbotron>
      </div>)
  }
}