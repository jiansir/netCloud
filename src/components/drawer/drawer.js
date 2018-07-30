import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import Mask from 'base/mask/mask';
import { LS_Get} from 'common/util';
import {isEmpty} from "lodash";
import './drawer.scss';

class Drawer extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      
    }
  }
  componentDidMount() {
   
  }
  render(){
    const { onHide, isShow, loginFlag, userDetail } = this.props;
    return (
      <div>
        <Mask show={isShow} onMaskClick={onHide} />
        <div className={classNames("drawer", { open: isShow })}>
        {
            loginFlag ? !isEmpty(userDetail)&&<UserContent userDetail={userDetail}/>:
              <div className="loginNot">
                <p>登录网易云音乐</p>
                <p>320K高音质无线下载，手机电脑多端同步</p>
                <div className="login-btn">
                  立即登录
                 </div>
              </div>
        }
          
        </div>
      </div>
    )
  }
}
const UserContent=({userDetail})=>{
  return (
    userDetail&&
    <div className="userWrap">
        <div className="userTop">
          <div className="userHead">
            <img src={userDetail.profile.avatarUrl} alt="" />
          </div>
          <div className="user-flex">
            <div className="user-name">{userDetail.profile.nickname}</div>
            <div className="user-level">LV.{userDetail.level}</div>
          </div>
        </div>
    </div>
  )
}

Drawer.propTypes={
  onHide:PropTypes.func.isRequired,
  isShow:PropTypes.bool.isRequired,
  loginFlag:PropTypes.bool.isRequired,
  userDetail:PropTypes.object
}
export default Drawer