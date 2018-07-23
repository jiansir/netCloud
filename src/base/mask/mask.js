import React from 'react';
import './mask.scss';

const Mask=(props)=>{
  const { show, onMaskClick}=props;
  return (
    show&&
    <div className={`mask ${show ? 'active' : ''}`} onClick={(e) =>onMaskClick(e,false)}>

    </div>
  )
}
export default Mask