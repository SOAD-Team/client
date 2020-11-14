import React, { Component } from 'react';
import { Container, Button, Fade, Form, FormGroup, Label, Input, NavLink, NavItem } from 'reactstrap';
import { InitMenu } from './InitMenu';
import Carousel1 from './Carousel';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';
import Cookies from 'universal-cookie'


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
      await axios.get(baseUrl, {params: {Email: this.state.form.Email, Password: this.state.form.Password}})
      .then(response=>{
        return response.data;
        
      })
      .then(response=>{
        if(response.length>0){
          var respuesta=response[0];
          cookies.set('Name', respuesta.Name, {path:"/"})
          cookies.set('LastName', respuesta.LastName, {path:"/"})
          cookies.set('Email', respuesta.Email, {path:"/"})
          alert(`Bienvenido ${respuesta.Name} ${respuesta.LastName}`)
          window.location.href= "/home";
        }else{
          alert ('Elusuario o la contraseña no son correctos')
        }
      })
      .catch(error=>{
        console.log(error);
      })
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