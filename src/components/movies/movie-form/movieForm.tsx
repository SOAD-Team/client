import React, { Component } from 'react';
import { Movie } from '../../../models/movie';
import { MovieService } from '../../../services/movieService'
import { Language } from '../../../models/language';
import { Style } from '../../../models/style';
import CreatableSelect from 'react-select/creatable';
import { Media, Row, Col, Form, FormGroup, Label, Input, Button, CustomInput, Jumbotron } from 'reactstrap';
import { Validators } from '../../../helpers/validators';
import { IOption } from '../../shared/IOption';
import { Genre } from '../../../models/genre';
import { KeyValuePair } from '../../../models/keyValuePair';
import { Image } from '../../../models/image';
import { DotLoader } from 'react-spinners';
import { NavMenu } from '../../core/navMenu/NavMenu';
import { GenreService } from '../../../services/genreService';
import { LanguageService } from '../../../services/languageService';
import { StyleService } from '../../../services/styleService';
import { ImageService } from '../../../services/imageService';

export interface IValue {
  value: Movie, loading: boolean, image: FormData
}
export default class MovieForm extends Component {

  title: string = '';
  state: IValue;
  genres: IOption<Genre>[];
  languages: IOption<Language>[];
  styles: IOption<Style>[];
  requiresImage: boolean = true;

  constructor(props) {
    super(props);

    this.state = {
      value: Movie.Empty,
      loading: true,
      image: new FormData()
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const genres: Genre[] = (await GenreService.getAll()).data;
    const languages: Language[] = (await LanguageService.Singleton().getAll()).data;
    const styles: Style[] = (await StyleService.getAll()).data;

    this.genres = genres.map(genre => {
      const data = { value: genre, label: genre.name };
      return data;
    });

    this.languages = languages.map(language => {
      const data = { value: language, label: language.name };
      return data;
    });

    this.styles = styles.map(style => {
      const data = { value: style, label: style.name };
      return data;
    });
  }

  handleImage = (event: any) => {
    const file: any = event.target.files[0];
    this.state.image.append('image', file, file.name);
  }

  handleSelectionChange = (newValue: IOption<KeyValuePair>[], actionMeta: any, movieList: KeyValuePair[]) => {
    switch (actionMeta.action) {
      case 'clear':
        this.handleClear(movieList);
        break;
      case 'create-option':
        this.handleCreateOption(newValue, movieList);
        break;
      case 'select-option':
        this.handleSelectOption(newValue, movieList);
        break;
      case 'remove-value':
        this.handleRemoveValue(newValue, movieList);
        break;
    }
  };

  handleRemoveValue(newValue: IOption<KeyValuePair>[], movieList: KeyValuePair[]) {
    if (!newValue)
      this.handleClear(movieList);
    else {
      let newValueList: KeyValuePair[] = [];
      movieList.forEach(element => {
        if (newValue.find(val => val.label === element.name)) {
          newValueList.push(element);
        }
      });
      this.handleClear(movieList);
      newValueList.forEach(val => {
        movieList.push(val);
      })
    }
  }

  handleSelectOption(newValue: IOption<KeyValuePair>[], movieList: KeyValuePair[]) {
    movieList.push(newValue.slice(-1)[0].value);

  }

  handleCreateOption(newValue: IOption<KeyValuePair>[], movieList: KeyValuePair[]) {
    const option = newValue.slice(-1)[0]
    const val: KeyValuePair = { name: option.label };
    movieList.push(val);
  }

  handleClear(movieList: KeyValuePair[]) {
    movieList.length = 0;
  }

  handleInputSelectionChange = (inputValue: string, actionMeta: any) => {
    if (inputValue)
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    return inputValue;
  };

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
      const movie: Movie = this.state.value;
      console.log(movie.image.url);
      if (Validators.validateMovie(movie)) {
        const image: Image = (await ImageService.post(this.state.image)).data;
        console.log(image);
        movie.image = image;
        MovieService.post(movie).then(res => {
          console.log(res.data);
          window.location.href = "/updateMovie";
        });
      }
    } catch (error) {
      console.error(error);
    }

  }

  notEmpty(list: any[]): boolean {
    return list.length > 0;
  }

  render() {
    let contents: any = this.state.loading
      ? <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <DotLoader size={100} loading={this.state.loading}/>
      </div>
      : this.renderForm();
    return (
      <div>
        <NavMenu/>
          <h1 id="formLabel" >{this.title}</h1>
        {contents}
      </div>
    )
  }

  renderForm() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label>Title:</Label>
                <Input name='name' id="name" type="text" value={this.state.value.name} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Director:</Label>
                <Input name='director' id="director" type="text" value={this.state.value.director} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Year:</Label>
                <Input name='year' id="year" type="number" min="1900" max="2099" value={this.state.value.year} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label>Genre:</Label>
                <CreatableSelect
                  defaultValue={[]}
                  isMulti
                  isClearable
                  onChange={(e, a) => this.handleSelectionChange(e, a, this.state.value.genres)}
                  onInputChange={this.handleInputSelectionChange}
                  name="genres"
                  className="genre-multi-select"
                  classNamePrefix="selectGenre"
                  options={this.genres}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Languages:</Label>
                <CreatableSelect
                  defaultValue={[]}
                  isMulti
                  isClearable
                  onChange={(e, a) => this.handleSelectionChange(e, a, this.state.value.languages)}
                  onInputChange={this.handleInputSelectionChange}
                  name="languages"
                  className="languages-multi-select"
                  classNamePrefix="selectLanguages"
                  options={this.languages}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Style:</Label>
                <CreatableSelect
                  defaultValue={[]}
                  isMulti
                  isClearable
                  onChange={(e, a) => this.handleSelectionChange(e, a, this.state.value.styles)}
                  onInputChange={this.handleInputSelectionChange}
                  name="style"
                  className="styles-multi-select"
                  classNamePrefix="selectStyles"
                  options={this.styles}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <CustomInput id="platFav" name='platFav' type="switch" label="Is Platform Favorite?:" checked={this.state.value.platFav} onChange={this.handleChange} />
          </FormGroup>

          <Row form>
            <Col md={3}>
              <FormGroup>
                <Media height="275" width="230" id="image" src={this.state.value.image.url} alt="Generic placeholder image" />
              </FormGroup>
            </Col>
            <Col md={9}>
              <FormGroup>
                <Label>Image:</Label>
                  <CustomInput type="file" onChange={this.handleImage} id="imageUp" name='image' required={this.requiresImage} />
              </FormGroup>
            </Col>
          </Row>


          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>MetaScore:</Label>
                <Input id="metaScore" name='metaScore' type="number" max='10' min='0' value={this.state.value.metaScore} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>IMDB:</Label>
                <Input id="imdb" name='imdb' type="number" max='10' min='0' value={this.state.value.imdb} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>


          <Button type="submit" >Submit</Button>
          <Button type="reset" href="/mvRecommendations" color="danger">Cancel</Button>
        </Form>
      </Jumbotron>);
  }
}