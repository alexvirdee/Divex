import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Formtext } from 'reactstrap';
import '../App.css';

export default class Login extends Component {
	render() {
		return (
				<div className="Login">
       <h2> Welcome to Divex </h2>
         <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input placeholder="username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password"  placeholder="password" />
        </FormGroup>
        <Button color="primary">Login</Button>
        <p className="login-para"> Not a member? Sign up here</p>
        <Button color="success">Sign Up</Button>
      </Form>
      </div>
			)
	}
}

