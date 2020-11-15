import React, { Component } from 'react';
import { Container, Button, Fade, Form, FormGroup, Label, Input, NavLink, NavItem } from 'reactstrap';
import { InitMenu } from './core/initMenu/InitMenu';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class SingIn extends Component {
    static displayName = SingIn.name;

    render () {
        return (
          <div>
              <InitMenu />
              <Container className="center">
              <NavLink tag={Link} to="/" className="text-white">
                <Button className="btn btn-primary btn-lg btn-block" color="primary">Sing In</Button>   
                 </NavLink> 
                </Container>

        </div>
        );    
}
}