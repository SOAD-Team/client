import React, { Component } from 'react';
import { MovieData } from '../../../models/movie-data';
import { MovieService } from '../../../services/movieService'
import { Language } from '../../../models/language';
import { Style } from '../../../models/style';
import CreatableSelect from 'react-select/creatable';
import { Media, Row, Col, Form, FormGroup, Label, Input, Button, CustomInput, Jumbotron } from 'reactstrap';
import { Validators } from '../../../helpers/validators';
import { IOption } from '../../shared/IOption';
import { Genre } from '../../../models/genre';
import { IData } from '../../../models/data';
import { Image } from '../../../models/image';
import { DotLoader } from 'react-spinners';
import { NavMenu } from '../../core/navMenu/NavMenu';
import './MovieRecommendation.css';

interface IValue {
  value: MovieData, loading: boolean
}
export default class MovieRecommendations extends Component {

  state: IValue;
  genres: IOption<Genre>[];
  languages: IOption<Language>[];
  styles: IOption<Style>[];

  constructor(props) {
    super(props);

    this.state = {
      value: MovieData.Empty,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const genres: Genre[] = (await MovieService.getGenres()).data;
    const languages: Language[] = (await MovieService.getLanguages()).data;
    const styles: Style[] = (await MovieService.getStyles()).data;

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
    this.setState({ ...this.state, loading: false });
  }

  handleImage = (event: any) => {
    const file: any = event.target.files[0];
    const fd: FormData = new FormData();
    console.log(fd);
    fd.append('image', file, file.name);
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        image: {
          objectImage: fd,
          url: URL.createObjectURL(file)
        }
      }
    })
  }

  handleSelectionChange = (newValue: IOption<IData>[], actionMeta: any, movieList: IData[]) => {
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

  handleRemoveValue(newValue: IOption<IData>[], movieList: IData[]) {
    if (!newValue)
      this.handleClear(movieList);
    else {
      let newValueList: IData[] = [];
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

  handleSelectOption(newValue: IOption<IData>[], movieList: IData[]) {
    movieList.push(newValue.slice(-1)[0].value);

  }

  handleCreateOption(newValue: IOption<IData>[], movieList: IData[]) {
    const option = newValue.slice(-1)[0]
    const val: IData = { name: option.label };
    movieList.push(val);
  }

  handleClear(movieList: IData[]) {
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
      const movie: MovieData = this.state.value;
      if (Validators.validateMovie(movie)) {
        const image: Image = (await MovieService.createImage(movie.image.objectImage)).data;
        console.log(image);
        movie.image = image;
        MovieService.createMovie(movie).then(res => {
          console.log(res.data);
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
        <h1 id="formLabel" className="center">Movie Recommendations!</h1>
        {contents}
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
                <CreatableSelect
                  defaultValue={[]}
                  onInputChange={this.handleInputSelectionChange}
                  name="genres"
                  className="genre-multi-select"
                  classNamePrefix="selectGenre"
                  options={this.genres}
                />
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
                <Input id="favorite" name='favorite' type="number" max='35' min='0' value={this.state.value.favorite} onChange={this.handleChange} />
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
              <Button type="submit" className="btn btn-primary btn-lg btn-block my-4" color="primary">Recomnendations</Button>
              </FormGroup>
            </Col>
            <Col md={2}></Col>
          </Row>

        </Form>
      </Jumbotron>);
  }
}