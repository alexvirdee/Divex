import React, { Component } from 'react';
import '../App.css';

export default class SignUpForm extends Component {
	render() {
		return (
				<div className="SignUpForm">
				<h2> Sign up to Divex </h2>
				<form id="form-container">
  <label for="username">Username</label>
  <input id="username" type="text" name="username" >
  <br><br>
  <label for="password">Password</label>
  <input placeholder="Your password">

  <br><br>

  <button>Create account</button>

  <p>
    Do you already have an account?
    <a href="#">Login</a>
  </p>

  <p>
    <a href="/logout">Logout</a>
  </p>
</form>
			)
	}
}