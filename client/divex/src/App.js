import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
    	<Router>
      <div className="App">
       <Login/>

      </div>
      </Router>
    );
  }
}

export default App;
