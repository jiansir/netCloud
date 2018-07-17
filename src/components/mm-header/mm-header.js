import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import './mm-header.scss';

const Mheader=(props)=>{
  console.log(props);
  const showHeader = /music|home|video/.test(props.location.pathname);
  
  return (
    showHeader&&
    <header className="mm-header">
      <div className="mm-header-left"></div>
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