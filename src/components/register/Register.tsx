import React, { Component} from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { User } from "../../models/user";
import { RegisterService } from "../../services/registerService";

interface stateValue {
  value: User;
  loading: boolean;
  passMatch : boolean;
}

export default class Register extends Component {
  state: stateValue;

  constructor(props) {
    super(props);
    this.state = {
      value: User.Empty,
      loading: false,
      passMatch : false
    }
    this.loadHandlers();
  }

  loadHandlers(): void {
    this.handleChange = this.handleChange.bind(this);

    this.handleSignUp = this.handleSignUp.bind(this);

    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleSignUp(event) {
    console.log(this.state.value);
    const data = await RegisterService.postUserInfo(this.state.value);
    if(data === 0){
      alert("User is already registered!");
    }else{
      alert("User Registered!");
    }
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

  handlePassword(event: any){
    const target = event.target;
    const valueEntered = target.value;
    if(this.state.value.Password === valueEntered){
      const stateValue : stateValue = {
        ...this.state,
        passMatch : true
      }
      this.setState(stateValue);
    }
    else{
      const stateValue : stateValue = {
        ...this.state,
        passMatch : false
      }
      this.setState(stateValue);
    }
  }

  render() {
    return (
      <Jumbotron>
        <h1 id="formLabel">Create your Account!</h1>
        <br></br>
        <br></br>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">
                  Please enter your First Name:
                </Label>
                <Input
                  type="text"
                  name="Name"
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
                  name="LastName"
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
                  name="Email"
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
                  name="Password"
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
                <Label for="examplePassword" className="mr-sm-2">
                  Confirm the password for your account
                </Label>
                <Input
                  type="password"
                  name="CPassword"
                  id="CexamplePassword"
                  placeholder="Yat another Super Secret Password!"
                  onChange={this.handlePassword}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
               {!this.state.passMatch && <Alert key={'danger'} variant={'danger'}>Passwords do not match!</Alert>}
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
          <Button onClick={this.handleSignUp} disabled={!this.state.passMatch}>Submit</Button>
        </Form>
      </Jumbotron>
    );
  }
}
