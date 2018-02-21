import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Formtext } from 'reactstrap';
import '../App.css';

export default class SignUpForm extends Component {
	render() {
		return (
			<div className="SignUpForm">
       <h2> Sign up for Divex </h2>
         <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input placeholder="username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password"  placeholder="password" />
        </FormGroup>
        <Button color="primary">Create Account</Button>
      </Form>
      </div>
			)
	}
}