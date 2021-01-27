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
import { UserService } from "../../services/userService";
import { InitMenu } from '../core/initMenu/InitMenu';

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
    try{
      const data = (await UserService.Singleton().post(this.state.value)).data;
      alert(`User ${data.email} registered`);
      
    }
    catch(e){
      alert(e);
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
    if(this.state.value.password === valueEntered){
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
      <div>
        <InitMenu />

      <Jumbotron>
      <div className="row">
      <div className="col-4"></div>
      <div className="col-8">
        <h2 id="formLabel">Create your Account!</h2>
      
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
          <div className="row">
      <div className="col-1"></div>
      <div className="col-1"></div>
          <Button className="btn btn-primary btn-lg" color="info" onClick={this.handleSignUp} disabled={!this.state.passMatch}>Submit</Button>
          <div className="col-1"></div>
          </div>
        </Form>
        </div> 
        <div className="col-2"></div>
      </div> 
      </Jumbotron>
      </div>
    );
  }
}
