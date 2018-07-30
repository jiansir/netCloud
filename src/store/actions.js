import *as ActionTypes from './actionTypes';
import axios from 'axios';
import request from '../common/request';
import { 
  getBannerApi, 
  getPersonalizedApi, 
  getPlaylistDetailApi,
  loginApi,
  getUserDetailApi,
  getUserSongListApi,
  getMusicLrcApi
} from '../api';

export function getBanner(data,dispatch){
  request({
    url: getBannerApi,
    data
  }).then(function(res){
    if (res.status==200){
      return dispatch({
        type: ActionTypes.GET_BANNER,
        payload:{data:res.data,code:res.data.code}
      })
    }
    dispatch({
      type: ActionTypes.GET_BANNER,
      payload:{code:res.data.code}
    })
  },function(){
    dispatch({
      type: ActionTypes.GET_BANNER,
      payload:{code:-1,message:'接口异常'}
    })
  })
}

//获取推荐歌单
export function getPersonalized() {
  return axios.get(getPersonalizedApi)
}
export function getPlaylistDetail(id){
  const url = getPlaylistDetailApi;
  return axios.get(url,{
    params:{
      id
    }
  })
}
export function getUserDetail(uid){
  let url = getUserDetailApi;
  return axios.get(url,{
    params: {
      uid
    }
  })
}
export function getMusicLrc(id){
  let url = getMusicLrcApi;
  return axios.get(url,{
    params:{
      id
    }
  })
}


export function setShowPlayer(showPlayer){
  return { type: ActionTypes.SET_SHOW_PLAYER,payload:showPlayer}
}
export function setMusicList(playList){
  return { type: ActionTypes.SET_MUSIC_LIST, payload: playList}
}
export function setCurrentMusic(music) {
  return { type: ActionTypes.SET_CURRENT_MUSIC, payload: music }
}
export function setCurrentIndex(index) {
  return { type: ActionTypes.SET_CURRENT_INDEX, payload: index }
}
export const setMusicAll=({playlist,currentIndex})=>dispatch=>{
  dispatch(setShowPlayer(true))
  dispatch(setMusicList(playlist));
  dispatch(setCurrentIndex(currentIndex));
  dispatch(setCurrentMusic(playlist[currentIndex]))
}
export const login = (data,dispatch)=>{
  request({
    url: loginApi,
    data
  }).then((res)=>{
    if (res.status == 200) {
      if(res.data.code==200){
        return dispatch({
          type: ActionTypes.LOGIN,
          payload: {data : res.data, code: res.data.code }
        })
      }
      return dispatch({
        type: ActionTypes.LOGIN,
        payload: { code: res.data.code,data:res.data.msg }
      })
    }
    dispatch({
      type: ActionTypes.LOGIN,
      payload: { code: res.data.code,data:'请求失败' }
    })
  },(error)=>{
    dispatch({
      type:ActionTypes.LOGIN,
      payload:{code:-1,data:'请求异常'}
    })
  })
}

export const getUserSongList=(data,dispatch)=>{
  request({
    url: getUserSongListApi,
    data
  }).then(res=>{
    if (res.status == 200) {
      if (res.data.code == 200) {
        return dispatch({
          type: ActionTypes.GET_USER_SONGLIST,
          payload: { code: res.data.code, data: res.data.playlist }
        })
      }
      return dispatch({
        type: ActionTypes.GET_USER_SONGLIST,
        payload: { code: res.data.code, data: '请求失败' }
      })
    }
  },error=>{
    console.log(error);
  })
}