import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class Home extends Component {
  static displayName = Home.name;
  

  render () {
    console.log('Name:'+ cookies.get('Name'));
    console.log('LastName:'+ cookies.get('LastName'));
    console.log('Email:'+ cookies.get('Email'));
    return (
      <div>
        <NavMenu />
        <Container>
          <div>
        <p>Homepage Works!</p>
        </div>
        </Container>
      </div>
    );
  }
}