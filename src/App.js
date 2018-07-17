import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import './App.css';

import Mheader from './components/mm-header/mm-header';
import Home from './pages/home/home';
import PlayLsit from './pages/playlist/playlist';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Mheader />
          <main className="mm-wrapper">
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/playlist/:id' component={PlayLsit} />

            </Switch>
          </main>
        </div>
        
      </Router>
      );
    }
  }
  
  export default App;
