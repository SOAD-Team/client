import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Input, Jumbotron, Media, Row } from 'reactstrap';
import { MovieData } from '../../models/movie-data';
import { MovieService } from '../../services/movieService';
import './MovieSearch.css'


interface stateValue {
  value: MovieData[];
  loading: boolean;
  allData: MovieData[];
  selectedId: number;
  searchWord: string;
}


export default class MovieSearch extends Component {
  
  state: stateValue;

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      loading: false,
      selectedId : -1,
      searchWord: "",
      allData: []
    }

    this.loadHandlers();
  }

  loadHandlers(): void {
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(){
    this.loadData();
  }

  async loadData() {

    const movies: MovieData[] = (await MovieService.getMovieData()).data;
    
    const stateValue: stateValue = {
      ...this.state,
      allData : movies
    }
    this.setState(stateValue);
  }

  handleChange(event: any){
    const target = event.target;
    const value = target.value;
    const stateValue: stateValue = {
      ...this.state,
      searchWord: value,
    };

    this.setState(stateValue);
  }

  handleSearch(){
    var filtered : MovieData[];
    const re = new RegExp(this.state.searchWord, 'i');

    filtered = this.state.allData.filter(movie => Object.values(movie).some(val => typeof val === "string" && val.match(re)));

    const stateValue : stateValue = {
      ...this.state,
      value : filtered,
    };

    this.setState(stateValue);
  }

  render() {    
    return (
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
              <Media body>
                <Media heading>
                  {movie.title}
                </Media>
                Year: {movie.year}
              </Media>
            </Media>
            <br></br>
          </div>
        )}
    </Jumbotron>
    )
  }
}