
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import mymovie from '../../../assets/img/mymovie.png'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  state: any;

  name=cookies.get('Name');
  lastname=cookies.get('LastName');
  

  constructor (props: any) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logOut=()=> {
    cookies.remove('Name', {path: "/"});
    cookies.remove('LastName', {path: "/"});
    cookies.remove('Email', {path: "/"});
    window.location.href= './';


  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow navfondo mb-3" light>
          <Container>
          <NavbarBrand tag={Link} to="/home">
                  <img src={mymovie} alt="mymovie"/>
                </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
              <NavItem>
                  <UncontrolledDropdown>
                    <DropdownToggle>
                      Movies
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/createMovie">Create a Movie</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/updateMovie">Update my movies</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/mvSearch">Movie Search</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/updateMovie">Movie Recommendations</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <UncontrolledButtonDropdown>
                    <DropdownToggle caret className="text-white">
                      {this.name} {this.lastname}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink className="text-black" onClick={this.logOut}>Log Out</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}