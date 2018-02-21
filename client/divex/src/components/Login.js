import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../App.css';

export default class Login extends Component {
	render() {
		return (
				<div className="Login">
       <h2> Welcome to Divex </h2>


         <p>
                  <Button
                    tag="a"
                    color="success"
                    size="large"
                    href="#"
                  >
                    Login
                  </Button>
                </p>
          
      </div>
			)
	}
}

