import { URL, defaultLimit} from '../common/config';

//获取轮播
// export function getBanner(){
//   const url=`${URL}/banner`;
//   return axios.get(url)
// }
export const getBannerApi = `${URL}/banner`;
export const getPersonalizedApi = `${URL}/personalized`;
export const getPlaylistDetailApi = `${URL}/playlist/detail`;
export const loginApi = `${URL}/login/cellphone`;
export const getUserSongListApi = `${URL}/user/playlist`;
export const getUserDetailApi = `${URL}/user/detail`;
export const getMusicLrcApi = `${URL}/lyric`;
