import React, { Component } from 'react';
import { Jumbotron, Media, Input, Form, FormGroup, Label, InputGroup, InputGroupAddon, Button, Col, Row } from 'reactstrap';
import { Movie } from '../../../models/movie';
import { MovieService } from '../../../services/movieService';
import './MovieInfo.css'
import { NavMenu } from '../../core/navMenu/NavMenu';
import { DotLoader } from 'react-spinners';
import { IReview } from '../../../models/review';
import { ReviewService } from '../../../services/reviewService';


interface stateValue {
  value: Movie;
  loading: boolean;
  id: number;
  languages: string[];
  genres: string[];
  note: number;
  comment: string;
  reviews: IReview[];
}

export default class MovieInfo extends Component {

  state: stateValue;

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loading: true,
      id: props.match.params.id,
      languages: [],
      genres: [],
      note: -1,
      comment: "",
      reviews: []
    }
    this.loadHandlers();
  }

  loadHandlers(): void {
    this.handleComment = this.handleComment.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.createReview = this.createReview.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const movie: Movie = (await MovieService.Singleton().get(this.state.id)).data;
    console.log(movie);
    const reviews: IReview[] = (await ReviewService.Singleton().getByMovie(this.state.id)).data;

    var langNames: string[] = [];
    var genNames: string[] = [];

    movie.languages.forEach(lang => 
      langNames.push(lang.name)
    );
    movie.genres.forEach(gen => 
      genNames.push(gen.name)
    )

    const stateValue: stateValue = {
      ...this.state,
      loading: false,
      value: movie,
      languages: langNames,
      genres: genNames,
      reviews: reviews
    }
    this.setState(stateValue);
  }

  getAllLanguages() {
    var languages: string = "";
    this.state.languages.forEach(lang => {
      languages = languages + lang + " ";
    });
    return languages;
  }

  getAllGenres() {
    var genres: string = "";
    this.state.genres.forEach(gen => {
      genres = genres + gen + " ";
    });
    return genres;
  }


  handleComment(event: any) {
    const target = event.target;
    const value = target.value;
    const stateValue: stateValue = {
      ...this.state,
      comment: value,
    };

    this.setState(stateValue);
  }

  handleNote(event: any) {
    const target = event.target;
    const value = target.value;
    const stateValue: stateValue = {
      ...this.state,
      note: value,
    };

    this.setState(stateValue);
  }

  
  createReview() {
    console.log(this.state.note);
    console.log(this.state.comment);

    var rev : IReview = {idReview : -1, idMovie : this.state.id, score: this.state.note, comment: this.state.comment};

    ReviewService.Singleton().post(rev);

  }


  renderReview() {
    return(
      <div>
        {
          
        }
      </div>
    )
  }

  
  render() {
    let contents: any = this.state.loading
            ? <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <DotLoader size={100} loading={this.state.loading} />
            </div>
            : this.renderInfo();
        return (
            <div >
                <NavMenu />
                {contents}
            </div>
        )
  }

  renderInfo()
  {
    return(
      <div>
        <Jumbotron>{this.state.value != null &&
          <div>
            <h1 id="formLabel">{this.state.value.name}</h1>
            <br></br>
            <Media key={this.state.value.idMovie}>
              <Media left top>
                <Media object src={this.state.value.image.url} alt="new" className="photoInfo" />
              </Media>
              <Media body className="movieInfo">
                Year: {this.state.value.year}
                <Media heading>
                  <br></br>
                </Media>
                <Media body className="movieInfo">
                  Director: {this.state.value.director}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Meta Score: {this.state.value.metaScore}
                </Media>
                <Media body>
                  <br></br>
                </Media>
                <Media body>
                  IMDB: {this.state.value.metaScore}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Languages: {this.getAllLanguages()}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Genres: {this.getAllGenres()}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Score: {this.state.value.communityScore}
                </Media>
                <Media heading>
                  <br></br>
                </Media>
                <Media body>
                  Style: {this.state.value.styles[0].name}
                </Media>
                <Media body>
                  Popularity: {this.state.value.popularity}
                </Media>
              </Media>
            </Media>
            <br></br>
            <br></br>
            
          <Form className="left">
            
            <Col md={3}>
            <h1> Review</h1>
            </Col>
            <Row>
            <Col md={1}>
            <FormGroup>
            <Label for="note"> Note: </Label>
              <Input id="note" name='note' type="number" max='10' min='0' onChange={this.handleNote} />
              </FormGroup>
              </Col>
              <Col md={11}>
          <FormGroup>
          <Label for="comment"> Comment: </Label>
           <InputGroup>
              <Input onChange={this.handleComment} />
                <InputGroupAddon addonType="append">
                  <Button onClick={this.createReview} color="secondary">Add Comment!</Button>
                  </InputGroupAddon>
              </InputGroup>
              
                  </FormGroup>
                  </Col>
                </Row>
            </Form>
            <br></br>
            {this.state.reviews.map(review => 
              <FormGroup>
                <Label> Comment: {review.comment} Score: {review.score}</Label>
                <br></br>
              </FormGroup>)}
          </div>}
        </Jumbotron>
      </div>
    )

  }
}