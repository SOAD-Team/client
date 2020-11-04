import React, { Component, useState } from 'react';
import { Container, Button, Fade, Form, FormGroup, Label, Input } from 'reactstrap';
import Example from './Carousel';
import { InitMenu } from './InitMenu';
import { Layout } from './Layout';
/*import { Botton, Alert, Breadcrum, Card, Form} */


export class LogIn extends Component {
    static displayName = LogIn.name;
  
    render () {
      return (
        <div>
            <InitMenu />
            <Container>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail"> Email </Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="example@gmail.com"/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword"> Password </Label>
                  <Input type="password" name="pasword" id="examplePassword" placeholder="password"/>
                </FormGroup>

                <Button color="primary"> Log In  </Button>              
                </Form>
          </Container>
        </div>
      );
    }
  }