import React, { Component } from 'react';
import './MovieCreator.css'
import { MovieData } from '../../../models/movie-data';
import { IGenre } from '../../../models/genre';
import { MovieService } from '../../../services/movieService'
import { ILanguage } from '../../../models/language';
import { IStyle } from '../../../models/style';
import { Media, Row, Col, Form, FormGroup, Label, Input, Button, CustomInput, Jumbotron } from 'reactstrap';

export default class MovieCreator extends Component {

  state: { value: MovieData, loading: boolean };
  genres: IGenre[];
  languages: ILanguage[];
  styles: IStyle[];


  constructor(props) {
    super(props);
    this.state = {
      value: MovieData.Empty,
      loading: true
    };
    this.loadHandlers();
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.genres = await MovieService.getGenres();
    this.languages = await MovieService.getLanguages();
    this.styles = await MovieService.getStyles();
    this.setState({ ...this.state, loading: false });
  }

  loadHandlers(): void {
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeYear = this.handleChangeName.bind(this);
    this.handleChangeGenre = this.handleChangeName.bind(this);
    this.handleChangeLanguage = this.handleChangeName.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.handleChangePlatFav = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeName.bind(this);
    this.handleChangeMetaScore = this.handleChangeMetaScore.bind(this);
    this.handleChangeImdb = this.handleChangeImdb.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChangeName(event) {
    this.setState({
      value: {
        ...this.state.value,
        name: event.target.value.name
      }
    })
  }

  handleChangeYear(event) {
    this.setState({
      value: {
        ...this.state.value,
        year: event.target.value.year
      }
    })
  }

  handleChangeGenre(event) {
    this.setState({
      value: {
        ...this.state.value,
        idGenre: event.target.value.idGenre
      }
    })
  }

  handleChangeLanguage(event) {
    this.setState({
      value: {
        ...this.state.value,
        idLanguage: event.target.value.idLanguage
      }
    })
  }

  handleChangeStyle(event) {
    this.setState({
      value: {
        ...this.state.value,
        idStyle: event.target.value.idStyle
      }
    })
  }

  handleChangePlatFav(event) {
    this.setState({
      value: {
        ...this.state.value,
        platFav: event.target.value.platFav
      }
    })
  }

  handleChangeImage(event) {
    this.setState({
      value: {
        ...this.state.value,
        image: { objectImage: event.target.value.objectImage }
      }
    })
  }

  handleChangeMetaScore(event) {
    this.setState({
      value: {
        ...this.state.value,
        metaScore: event.target.value.metaScore
      }
    })
  }

  handleChangeImdb(event) {
    this.setState({
      value: {
        ...this.state.value,
        imdb: event.target.value.imdb
      }
    })
  }

  handleSubmit(event) {
    alert('A movie was submitted: ' + this.state.value.name);
    event.preventDefault();
  }

  render() {
    let contents: any = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderForm();
    return (
      <div>
        <h1 id="formLabel" >Create a Movie!</h1>
        {contents}
      </div>
    )
  }

  renderForm() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Title:</Label>
                <Input type="text" value={this.state.value.name} onChange={this.handleChangeName} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Year:</Label>
                <Input type="number" min="1900" max="2099" value={this.state.value.year} onChange={this.handleChangeYear} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label>Genre:</Label>
                <Input type="select" value={this.state.value.idGenre} onChange={this.handleChangeGenre} multiple>
                  {this.genres.map((value, index) => {
                    return <option value="value.idGenre" key={index}>{value.name}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Languages:</Label>
                <Input type="select" value={this.state.value.idLanguage} onChange={this.handleChangeLanguage} multiple>
                  {this.languages.map((value, index) => {
                    return <option value="value.idLanguage" key={index}>{value.name}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Style:</Label>
                <Input type="select" value={this.state.value.idStyle} onChange={this.handleChangeStyle} multiple>
                  {this.styles.map((value, index) => {
                    return <option value="value.idStyle" key={index}>{value.name}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <CustomInput type="switch" label="Is Platform Favorite?:" checked={this.state.value.platFav} onChange={this.handleChangePlatFav} />
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Image:</Label>
                <Input type="file" value={this.state.value.image.objectImage} onChange={this.handleChangeImage} />
              </FormGroup>
            </Col>
          </Row>


          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>MetaScore:</Label>
                <Input type="number" max='10' min='0' value={this.state.value.metaScore} onChange={this.handleChangeMetaScore} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>IMDB:</Label>
                <Input type="number" max='10' min='0' value={this.state.value.imdb} onChange={this.handleChangeImdb} />
              </FormGroup>
            </Col>
          </Row>


          <Button type="submit">Submit</Button>
        </Form>
      </Jumbotron>);
  }
}