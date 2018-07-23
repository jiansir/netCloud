import { combineReducers} from 'redux';
import getBannerReducer from './banner';
// import { playlist, currentIndex, currentMusic, setShowPlayer} from './setMusic';
import setPlayReducer from './setMusic';
import loginReducer from './login';
const reducer=combineReducers({
  getBannerReducer,
  setPlayReducer,
  loginReducer
})
export default reducer