import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { InitMenu } from '../core/initMenu/InitMenu';
import Carousel1 from '../core/carousel/Carousel';
import '../core/navMenu/NavMenu.css';
import Cookies from 'universal-cookie'
import { UserService } from '../../services/userService';
import { User } from '../../models/user';

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

    logIn=async()=>{
      try {
        const user : User = User.Empty;
        user.email = this.state.form.Email;
        user.password = this.state.form.Password;
        User.local = (await (UserService.put(user))).data;
      console.log(User.local);
      if(User.local){
          const user: User = User.local;
          cookies.set('Name', user.name, {path:"/"})
          cookies.set('LastName', user.lastName, {path:"/"})
          cookies.set('Email', user.email, {path:"/"})
          window.location.href= "/mvRecommendations";
      }
      } catch (error) {
        alert ('Incorrect Email or Password')
        
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
                        <Input type="checkbox" value="remember-me" /> Remember Me
                  </Label>
                </div>
                <div className="row">
                <div className="center col-md-3 mb-3"></div>
                <div className="center col-md-6 mb-3">
                
                <Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={this.logIn}>Log In</Button>   
     
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