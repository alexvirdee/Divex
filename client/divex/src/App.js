import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Login/>
       <SignUpForm/>
      </div>
    );
  }
}

export default App;
