import React, { Component } from "react";
import "./Register.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Row,
  Col,
} from "reactstrap";
import { User } from "../../models/user";

interface stateValue {
  value: User;
  loading: boolean;
}

export default class Register extends Component {
  state: stateValue;

  constructor(props) {
    super(props);
    this.state = {
      value: User.Empty,
      loading: false
    }
    this.loadHandlers();
  }

  loadHandlers(): void {
    this.handleChange = this.handleChange.bind(this);

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(event) {
    console.log(this.state.value);
    alert("Your account was created succesfully!");
  }

  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const stateValue: stateValue = {
      ...this.state,
      value: {
        ...this.state.value,
        [name]: value,
      },
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
                <Label for="exampleEmail" className="mr-sm-2">
                  Please enter your First Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="nameInput"
                  placeholder="Enter your name"
                  onChange={this.handleChange}
                />
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
                <Label for="exampleEmail" className="mr-sm-2">
                  Please enter your Last Name:
                </Label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastnameInput"
                  placeholder="Enter your last name"
                  onChange={this.handleChange}
                />
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
                <Label for="exampleEmail" className="mr-sm-2">
                  Please enter your email:
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="something@idk.cool"
                  onChange={this.handleChange}
                />
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
                <Label for="examplePassword" className="mr-sm-2">
                  Enter the password for your new account
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Super Secret Password!"
                  onChange={this.handleChange}
                />
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
    );
  }
}
