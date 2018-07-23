import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

import Drawer from 'components/drawer/drawer';
import Mheader from './components/mm-header/mm-header';
import Home from './pages/home/home';
import PlayLsit from './pages/playlist/playlist';
import Player from 'components/player/player';
import Login from 'pages/login/login';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowLeft:false
    }
  }
  showLeft=state=>{
    this.setState({
      isShowLeft:state
    })
  }
  hideLeft=(e,state)=>{
    this.setState({
      isShowLeft: state
    })
  }
  render() {
    const { showPlayer} =this.props;
    const { isShowLeft}=this.state;
    return (
      <Router>
        <div className="main">
          <Drawer isShow={isShowLeft} onHide={this.hideLeft} />  
          <Mheader onShowLeft={this.showLeft}/>
          <main className="mm-wrapper">
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/playlist/:id' component={PlayLsit} />
              <Route path="/login" component={Login} />
              <Redirect to="/home" />
            </Switch>
          </main>
          {
            showPlayer && <Player/>
          }
        </div>
      </Router>
      );
    }
  }
  const mapStateToProps=state=>{
    return {
      showPlayer: state.setPlayReducer.showPlayer
    }
  }
  
export default connect(mapStateToProps)(App);
