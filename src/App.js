import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import {LS_Get} from 'common/util';
import Drawer from 'components/drawer/drawer';
import Mheader from './components/mm-header/mm-header';
import Home from './pages/home/home';
import PlayLsit from './pages/playlist/playlist';
import Player from 'components/player/player';
import Login from 'pages/login/login';
import MyMusic from 'pages/myMusic/myMusic';

import { getUserDetail} from 'store/actions';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowLeft:false,
      userDetail:{},
      loginFlag:false
    }
  }
  showLeft=state=>{
    this.setState({
      isShowLeft:state
    })
    this.getUserDetail();
  }
  hideLeft=(e,state)=>{
    this.setState({
      isShowLeft: state
    })
  }
  getUserDetail=()=>{
    var that=this;
    var uid = LS_Get('uid');
    if (uid) {
      this.setState({
        loginFlag: true
      })
      this.props.onGetUserDetail(uid).then(function (res) {
        if (res.data.code == 200) {
          that.setState({
            userDetail: res.data
          })
        }
      })
    }else{
      this.setState({
        loginFlag: false
      })
    }
  }
  render() {
    const { showPlayer} =this.props;
    const { isShowLeft, userDetail, loginFlag}=this.state;
    return (
      <Router>
        <div className="main">
        {/* {
            isShowLeft && <Drawer isShow={isShowLeft} onHide={this.hideLeft} onGetUser={this.getUserDetail} userDetail={userDetail} />  
        } */}
          <Drawer isShow={isShowLeft} onHide={this.hideLeft} loginFlag={loginFlag} userDetail={userDetail}/>  
          <Mheader onShowLeft={this.showLeft}/>
          <main className="mm-wrapper">
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/playlist/:id' component={PlayLsit} />
              <Route path="/login" component={Login} />
              <Route path="/music" component={MyMusic} />
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
const mapDispatchToProps=dispatch=>{
  return {
    onGetUserDetail: data => getUserDetail(data, dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App);
