import React, { Component } from 'react';
import { RecommendationsService } from '../../../services/recomendationService'
import { Row, Col, Form, FormGroup, Label, Input, Button, Jumbotron, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Validators } from '../../../helpers/validators';
import { Genre } from '../../../models/genre';
import { DotLoader } from 'react-spinners';
import { NavMenu } from '../../core/navMenu/NavMenu';
import './MovieRecommendation.css';
import { UserPoints } from '../../../models/userPoints';
import { MovieService } from '../../../services/movieService'
import { IRecommendation } from '../../../models/recommendation';

interface IValue {
  value: UserPoints, loading: boolean, movieLoading : boolean
}
export default class MovieRecommendation extends Component {

  state: IValue;
  genres: Genre[];
  responses: IRecommendation[] = [];


  constructor(props) {
    super(props);

    this.state = {
      value: {
        genre: null,
        imdb: 0,
        metaScore: 0,
        community: 0,
        platFav: 0,
        popularity: 0,
      },
      loading: true,
      movieLoading : false
    };
  }



  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.genres = (await MovieService.getGenres()).data;
    const state: IValue = {
      ...this.state,
      loading: false
    }
    this.setState(state);
  }


  handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.type === 'number' ? parseInt(target.value) : target.value;
    const name = target.name;
    const stateValue: IValue = {
      ...this.state,
      value: {
        ...this.state.value,
        [name]: value
      }
    };

    this.setState(stateValue);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const points: UserPoints = this.state.value;
      if (Validators.validateRecommendations(points)) {
        this.responses = (await RecommendationsService.getRecommendation(points)).data;
        this.setState({...this.state, movieLoading: true});
        console.log(this.responses);
      }
    } catch (error) {
      console.error(error);
    }

  }

  toggle = (event, genre) => {

    const state: IValue = {
      ...this.state,
      value: {
        ...this.state.value,
        genre
      }
    };
    this.setState(state);
  }

  render() {
    let contents: any = this.state.loading
      ? <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <DotLoader size={100} loading={this.state.loading} />
      </div>
      : this.renderForm();
    let movies: any = !this.state.movieLoading
    ?  <>No se muestran :c</> : this.renderMovies();
    return (
      <div>
        <NavMenu />
        <h1 id="formLabel" className="center">Movie Recommendations!</h1>
        {contents}
        <br/> 
        {movies}
      </div>
    )
  }
  renderMovies(): any {
    return (
      <div>
        {this.responses.map(element =>
        <h1>{element.movie.name}</h1>)}
      </div>
    )
  }


  renderForm() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>

          <Row form>
            <Col md={1}></Col>
            <Col md={10}>
              <FormGroup>
                <Label>Genre:</Label>
                <UncontrolledDropdown >
                  <DropdownToggle caret>
                    {(this.state.value.genre == null) ? <>Select Genre</> : <>{this.state.value.genre.name}</>}
                  </DropdownToggle>
                  <DropdownMenu modifiers={{
                    setMaxHeight: {
                      enabled: true,
                      order: 890,
                      fn: (data) => {
                        return {
                          ...data,
                          styles: {
                            ...data.styles,
                            overflow: 'auto',
                            maxHeight: '100px',
                          },
                        };
                      },
                    },
                  }}>
                    {this.genres.map(element =>
                      <DropdownItem onClick={e => this.toggle(e, element)}>{element.name}</DropdownItem>)}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </FormGroup>
            </Col>
          </Row>

          <h3 id="formLabel" className="center my-4">Weight of the categories...</h3>


          <Row form className="my-4">
            <Col md={2}></Col>
            <Col md={4}>
              <FormGroup>
                <Label>IMDB:</Label>
                <Input id="imdb" name='imdb' type="number" max='35' min='0' value={this.state.value.imdb} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>MetaScore:</Label>
                <Input id="metaScore" name='metaScore' type="number" max='35' min='0' value={this.state.value.metaScore} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row form>
            <Col md={2}></Col>
            <Col md={4}>
              <FormGroup>
                <Label>Community:</Label>
                <Input id="community" name='community' type="number" max='35' min='0' value={this.state.value.community} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Favorite:</Label>
                <Input id="platFav" name='platFav' type="number" max='35' min='0' value={this.state.value.platFav} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={2}></Col>
          </Row>

          <Row form>
            <Col md={2}></Col>
            <Col md={4}>
              <FormGroup>
                <Label>Popularity:</Label>
                <Input id="popularity" name='popularity' type="number" max='35' min='0' value={this.state.value.popularity} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Button type="submit" className="btn btn-primary btn-lg btn-block my-4" color="primary">Recommendations</Button>
              </FormGroup>
            </Col>
            <Col md={2}></Col>
          </Row>

        </Form>
      </Jumbotron>
    );
  }
}