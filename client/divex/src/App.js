import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    <Router>
     <div className="App">
     <Route exact path = "/" component={Landing}/>
      <Route path = "/login" component={Login} />
     <Route path = "/signup" component={SignUpForm} />
      </div>
     </Router>
    );
  }
}



export default App;