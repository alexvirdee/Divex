import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Formtext } from 'reactstrap';
import '../App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';

export default class Login extends Component {
	render() {
		return (
				<div className="Login">
       <h2> Divex </h2>
         <Form>
        <FormGroup>
          <Input placeholder="username" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password"  placeholder="password" />
        </FormGroup>
        <Button color="primary">Login</Button>
        <p className="login-para"> Not a member? Sign up here</p>
        <Link to ="/signup"> <Button color="success">Sign Up</Button> </Link>
      </Form>
      </div>
			)
	}
}

