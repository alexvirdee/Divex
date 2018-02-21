import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
    );
  }
}

export default App;
