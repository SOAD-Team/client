import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Home extends Component {
  static displayName = Home.name;

  render () {
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