import * as ActionTypes from '../actionTypes';
const initialState={
  playlist:[]
}

function getPlayList(playlist = initialState.playlist, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_SONGLIST:
      if(action.payload.code==200){
        return { playlist: action.payload.data };
      }
      return {playlist};
    default:
      return {playlist};
  }
}
export default getPlayList;