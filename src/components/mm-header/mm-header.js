import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import './mm-header.scss';

const Mheader=(props)=>{
  const showHeader = /music|home|video/.test(props.location.pathname);
  const openLeft=()=>{
    console.log(3333);
    props.onShowLeft(true)
  }
  return (
    showHeader&&
    <header className="mm-header">
      <div className="mm-header-left" onClick={openLeft}></div>
      <div className="mm-header-title">
        <NavLink className="mm-header-item music" to="/music"/>
        <NavLink className="mm-header-item discover" to="/home" />
        <NavLink className="mm-header-item video" to="/video" />
      </div>
      <div className="mm-header-right"></div>
    </header>
  )
}
export default withRouter(Mheader)