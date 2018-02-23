import React, { Component } from 'react';
import '../App.css';
import '../stylesheets/Landing.css';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class Landing extends Component {
	render() {
		return (
				<div className="Landing">
				<h2> Divex </h2>
				<Link to ="/login"> <Button color="success" block>Login</Button> </Link>
					<Link to ="/signup"> <Button color="primary" block>Sign Up</Button> </Link>
				</div>
			)
	}
}