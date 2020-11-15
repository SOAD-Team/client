import React, { Component } from 'react';
import { Container, Button, Fade, Form, FormGroup, Label, Input, NavLink, NavItem } from 'reactstrap';
import { InitMenu } from '../core/initMenu/InitMenu';
import Carousel1 from '../core/carousel/Carousel';
import { Link } from 'react-router-dom';
import '../core/navMenu/NavMenu.css';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { RegisterService } from '../../services/registerService';
import userEvent from '@testing-library/user-event';
import { User } from '../../models/user';


const baseUrl="http://localhost:3001/user"
const cookies = new Cookies();


export class LogIn extends Component {
    static displayName = LogIn.name;

    state={
      form:{
        Email: '',
        Password: ''
      }
        
    }

    handleChange=async (e: { target: { name: any; value: any; }; })=>{
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
      
    }

    iniciarSesion=async()=>{
      try {
        User.local = (await (RegisterService.logIn(this.state.form.Email, this.state.form.Password))).data;
      console.log(User.local);
      if(User.local){
          const respuesta:User=User.local;
          cookies.set('Name', respuesta.name, {path:"/"})
          cookies.set('LastName', respuesta.lastName, {path:"/"})
          cookies.set('Email', respuesta.email, {path:"/"})
          alert(`Bienvenido ${respuesta.name} ${respuesta.lastName}`)
          window.location.href= "/home";
      }
      } catch (error) {
        alert ('Elusuario o la contraseña no son correctos')
        
      }
      
      }
      
    
  
    render () {
      return (
        <div>
            <InitMenu />
            <Container className="center">
              <div className="row">
                <div className="col-6">
                  <Carousel1/>
                </div>
                <div className="col-6">
              <Form className="left">
                <FormGroup>
                  <Label for="exampleEmail"> User </Label>
                  <Input type="email" name="Email" id="exampleEmail" placeholder="example@gmail.com" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword"> Password </Label>
                  <Input type="password" name="Password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
                </FormGroup>
                <div className="checkbox mb-3 mx-4">
                  <Label>
                        <Input type="checkbox" value="remember-me" /> Remember me
                  </Label>
                </div>
                <div className="row">
                <div className="center col-md-3 mb-3"></div>
                <div className="center col-md-6 mb-3">
                
                <Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={this.iniciarSesion}>Log In</Button>   
     
                </div> 
                <div className="center col-md-3 mb-3"></div> 
                </div> 
                </Form>
                </div>
                </div>
                <p className="mt-5 mb-3 text-muted">&copy; 2020</p>   
          </Container>
        </div>
      );
    }
  }