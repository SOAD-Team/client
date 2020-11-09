import React, { Component, useState } from 'react';
import { Container, Button, Fade, Form, FormGroup, Label, Input } from 'reactstrap';
import Example from './Carousel';
import { InitMenu } from './InitMenu';
import { Layout } from './Layout';
import Carousel1 from './Carousel';
/*import { Botton, Alert, Breadcrum, Card, Form} */


export class LogIn extends Component {
    static displayName = LogIn.name;
  
    render () {
      return (
        <div>
            <InitMenu />
            <Container>
              <div className="row center">
                <div className="col-6">
                  <Carousel1/>
                </div>
                <div className="col-6">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail"> Email </Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="example@gmail.com"/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword"> Password </Label>
                  <Input type="password" name="pasword" id="examplePassword" placeholder="password"/>
                </FormGroup>
                <div className="checkbox mb-3 mx-4">
                  <Label>
                        <Input type="checkbox" value="remember-me" /> Remember me
                  </Label>
                </div>
                <Button color="primary"> Log In  </Button>           
                </Form>
                </div>
                </div>
                <p className="mt-5 mb-3 text-muted">&copy; 2020</p>   
          </Container>
        </div>
      );
    }
  }