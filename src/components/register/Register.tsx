import React, {Component} from 'react';
import './Register.css'
import { Button, Form, FormGroup, Label, Input, Jumbotron, Row, Col } from 'reactstrap';
import { IUser } from '../../models/user';

export default class Register extends Component {

  newUser: IUser = {name: " ", idUser: -1, lastname: " ", email: " ", password: " "};

  handleSignUp(event){
    alert('Your account was created succesfully!')
    console.log(this.newUser);
  }


  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const stateValue: IUser = {
      ...this.state,
      value: {
        ...this.state.value,
        [name]: value
      }
    };
    this.setState(stateValue);
  }


  render() {    
    return (
      <Jumbotron>
        <h1 id="formLabel">Create your Account!</h1>
        <br></br>
        <br></br>
        <Form onSubmit={this.handleSignUp}>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Please enter your First Name:</Label>
                <Input type="text" name="name" id="nameInput" placeholder="Enter your name" onChange={this.nameChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <br></br>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Please enter your Last Name:</Label>
                <Input type="text" name="lastname" id="lastnameInput" placeholder="Enter your last name" onChange={this.lastNameChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <br></br>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Please enter your email:</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.emailChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <br></br>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Enter the password for your new account</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Super Secret Password!" onChange={this.passwordChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <br></br>
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Jumbotron>
    )
  }
}