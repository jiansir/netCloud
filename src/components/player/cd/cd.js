import React from 'react'
import PropTypes from 'prop-types';
import './cd.scss';

const Cd=(props)=>{
  const {isPlay,image}=props;
  return (
    <div className={`player-cd ${isPlay?'':'pause'}`}>
      <div className="needle"></div>
      <div className="cd-box">
        <div className="cd-wrap"></div>
        <img src={`${image}?param=200y200`} alt=""/>
      </div>
    </div>
  )
}
Cd.propTypes={
  isPlay:PropTypes.bool.isRequired,
  image:PropTypes.string.isRequired
}
export default Cd