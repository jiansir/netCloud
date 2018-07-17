import React from 'react';
import {withRouter} from 'react-router-dom';

import './mm-nav.scss';

const MmNav=(props)=>{
  const { title,history}=props;
  return (
    <div className="mm-nav">
      <div className="mm-nav-left" onClick={history.goBack} />
      <div className="mm-nav-title">{title}</div>
      <div className="mm-nav-right" />
    </div>
  )
}
export default withRouter(MmNav)