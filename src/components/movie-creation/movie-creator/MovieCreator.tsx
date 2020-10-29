import React, { Component } from 'react';
import './MovieCreator.css'
import { MovieData } from '../../../models/movie-data';
import { IGenre } from '../../../models/genre';
import { MovieService } from '../../../services/movieService'
import { ILanguage } from '../../../models/language';
import { IStyle } from '../../../models/style';
import CreatableSelect from 'react-select/creatable';
import { Media, Row, Col, Form, FormGroup, Label, Input, Button, CustomInput, Jumbotron } from 'reactstrap';

interface IValue {
  value: MovieData, loading: boolean
}
export default class MovieCreator extends Component {

  state: IValue;
  genres: { value: IGenre, label: string }[];
  languages: { value: ILanguage, label: string }[];
  styles: { value: IStyle, label: string }[];


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
    const genres = await MovieService.getGenres();
    const languages = await MovieService.getLanguages();
    const styles = await MovieService.getStyles();

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

  loadHandlers(): void {
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange = (newValue: { value: any, label: string }[], actionMeta: any, valueList: any[]) => {
    switch (actionMeta.action) {
      case 'clear':
        this.handleClear(valueList);
        break;
      case 'create-option':
        this.handleCreateOption(newValue, valueList);
        break;
      case 'select-option':
        this.handleSelectOption(newValue, valueList);
        break;
      case 'remove-value':
        this.handleRemoveValue(newValue, valueList);
        break;
    }
  };

  handleRemoveValue(newValue: { value: any, label: string }[], valueList: any[]) {
    if (!newValue)
      this.handleClear(valueList);
    else{
      let newValueList = [];
      valueList.forEach(element => {
        if(newValue.find(val => val.label === element.label))
          newValueList.push(element);
      });
      this.handleClear(valueList);
      newValueList.forEach(val => {
        valueList.push(val);
      })
    }
  }

  handleSelectOption(newValue: { value: any, label: string }[], valueList: any[]) {
    valueList.push(newValue.slice(-1)[0]);
  }

  handleCreateOption(newValue: { value: any, label: string }[], valueList: any[]) {
    const val = newValue.slice(-1)[0]
    valueList.push({ label: val.label, value: null });
  }

  handleClear(valueList: any[]) {
    valueList.length = 0;
  }

  handleInputSelectionChange = (inputValue: any, actionMeta: any) => {
    //Check Spellings
    // console.group('Input Changed');
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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

  handleSubmit(event) {
    console.log(this.state.value);
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
                <Input name='name' id="name" type="text" value={this.state.value.name} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Year:</Label>
                <Input name='year' id="year" type="number" min="1900" max="2099" value={parseInt(this.state.value.year)} onChange={this.handleChange} />
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
            <Col md={6}>
              <FormGroup>
                <Media id="image" object data-src="holder.js/64x64" alt="Generic placeholder image" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Image:</Label>
                <CustomInput id="imageUp" name='image' type="file" />
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


          <Button type="submit">Submit</Button>
        </Form>
      </Jumbotron>);
  }
}