import React from 'react';
import ReactTitle from 'common/setTitle';
import { inputValueIsValid, inputCheckPhone} from 'common/util';
import { connect } from 'react-redux';
import { login} from 'store/actions';
import './login.scss';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      tel:'13140167758',
      password:'hao9bujian'
    }
  }
  changeTel(e){
    this.setState({
      tel:e.target.value
    })
  }
  changePsw(e){
    this.setState({
      password:e.target.value
    })
  }
  login=()=>{
    let phone=this.state.tel;
    let password=this.state.password;
    if (!inputValueIsValid(phone)){
      return false
    }
    if (!inputCheckPhone(phone)) {
      return false
    }
    if (!inputValueIsValid(password)) {
      return false
    }
    this.props.onLogin({
      phone,
      password
    })
  }
  componentWillReceiveProps(nextprops){
    console.log(nextprops);
    if (nextprops.loginStatus){
      this.props.history.push('/home');
    }
  }

  render(){
    return (
      <ReactTitle title="登录">
        <div className="login">
          <div className="login-item">
            <input type="number" className="login-tel" placeholder="手机号" onChange={(e)=>this.changeTel(e)}/>
          </div>
          <div className="login-item">
            <input type="text" className="login-password" placeholder="请输入密码" onChange={(e) => this.changePsw(e)}/>
          </div>
          <div className="login-btn" onClick={this.login}>登录</div>
        </div>
      </ReactTitle>  
    )
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    loginStatus: state.loginReducer.loginStatus,
    loginMsg:state.loginReducer.loginMsg
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => {
      login(data,dispatch)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)