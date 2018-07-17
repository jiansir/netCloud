import * as ActionTypes from '../actionTypes';
const initialState={
  banner:[]
}
function getBannerReducer(banenr = initialState.banner,action){
  switch (action.type){
    case ActionTypes.GET_BANNER:
      return { banner: action.payload.data.banners};
    default:
      return banenr;
  }
}
export default getBannerReducer;