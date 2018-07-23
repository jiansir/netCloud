import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import Mask from 'base/mask/mask';
import './drawer.scss';

const Drawer=(props)=>{
  const {onHide,isShow}=props;
  return(
    <div>
      <Mask show={isShow} onMaskClick={onHide} />
      <div className={classNames("drawer", { open: isShow })}>
        侧边栏
      </div>
      
    </div>
  )
}
Drawer.propTypes={
  onHide:PropTypes.func.isRequired,
  isShow:PropTypes.bool.isRequired
}
export default Drawer