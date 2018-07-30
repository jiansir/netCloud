import { fromJS} from "immutable";
import * as ActionTypes from '../actionTypes';
const initialState = {
  currentMusic:{},
  currentIndex:-1,
  playList:[],
  showPlayer:false
}

export default function setPlayReducer(state = fromJS(initialState).toJS(), action) {
  let payload=action.payload;
  switch (action.type) {
    case ActionTypes.SET_SHOW_PLAYER:
      return fromJS(state)
        .set('showPlayer',payload)
        .toJS()
    case ActionTypes.SET_MUSIC_LIST:
      return fromJS(state)
        .set('playList',payload)
        .toJS()
    case ActionTypes.SET_CURRENT_INDEX:
      return fromJS(state)
        .set('currentIndex', payload)
        .toJS()
    case ActionTypes.SET_CURRENT_MUSIC:
      return fromJS(state)
        .set('currentMusic', payload)
        .toJS()
    default:
      return state;
  }
}