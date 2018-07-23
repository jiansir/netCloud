import * as ActionTypes from '../actionTypes';
import { LS_Set} from 'common/util';
const initialState = {
  loginStatus: false,
  loginMsg:''
}
function loginReducer({loginStatus, loginMsg} = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      if(action.payload.code==200){
        LS_Set('uid', action.payload.data.account.id)
        return { loginStatus: true, loginMsg:'登录成功' }
      }
      return { loginStatus: false, loginMsg: action.payload.data}
    default:
      return { loginStatus};
  }
}
export default loginReducer;