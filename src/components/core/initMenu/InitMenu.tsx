import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../navMenu/NavMenu.css';
import mymovie from '../../../assets/img/mymovie.png'

export class InitMenu extends Component {
    static displayName = InitMenu.name;
    state: any;

    constructor (props: any) {
        super(props);
    
        this.toggleInitbar = this.toggleInitbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
    
      toggleInitbar () {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }


      render () {
        return (
          <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow navfondo mb-3" light>
              <Container>
                <NavbarBrand tag={Link} to="/">
                    <img src={mymovie} alt="mymovie"/>
                    </NavbarBrand>
                <NavbarToggler onClick={this.toggleInitbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} className="text-white" to="/">Log In</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-white" to="/register">Sing Up</NavLink>
                    </NavItem>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          </header>
        );
      }

}