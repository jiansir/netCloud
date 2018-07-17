import *as ActionTypes from './actionTypes';
import axios from 'axios';
import request from '../common/request';
import { 
  getBannerApi, 
  getPersonalizedApi, 
  getPlaylistDetailApi
} from '../api';

export function getBanner(data,dispatch){
  request({
    url: getBannerApi,
    data
  }).then(function(res){
    console.log(res)
    if (res.status==200){
      return dispatch({
        type: ActionTypes.GET_BANNER,
        payload:{data:res.data,code:res.code}
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