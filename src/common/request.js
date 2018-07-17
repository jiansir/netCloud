import axios from 'axios';
import { API_METHOD} from './config';
export default function request({url,method,data}){
  return axios({
    method: method || API_METHOD,
    url,
    data
  })
}