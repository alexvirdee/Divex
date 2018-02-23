import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Formtext } from 'reactstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../App.css';
import '../stylesheets/signup.css';

export default class SignUpForm extends Component {
	render() {
		return (
			<div className="SignUpForm">
       <h2> Sign Up </h2>
         <Form>
        <FormGroup>
          <Input placeholder="username" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password"  placeholder="password" />
        </FormGroup>
        <Button color="primary">Create Account</Button>
        <p className="login-para"> Already a member?</p>
        <Link to ="/login"> <Button color="success">Log in</Button> </Link>
      </Form>
      </div>
			)
	}
}