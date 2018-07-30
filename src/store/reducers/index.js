import { combineReducers} from 'redux';
import getBannerReducer from './banner';
// import { playlist, currentIndex, currentMusic, setShowPlayer} from './setMusic';
import setPlayReducer from './setMusic';
import loginReducer from './login';
import getPlayListReducer from './getPlayList';
const reducer=combineReducers({
  getBannerReducer,
  setPlayReducer,
  loginReducer,
  getPlayListReducer
})
export default reducer