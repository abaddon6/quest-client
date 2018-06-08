import axios from 'axios';
import {Config} from '../../Config.js'

export class GeneralService {

  backendUrl = new Config().get('QUEST_BACKEND_HOST') + "/quest/";

  constructor(props){
    axios.interceptors.response.use((response) => {
      return response;
    }, function (error) {
      if (error.response) {
        if(error.response.status === 401 || error.response.status === 403 || error.response.status === 500) {
          localStorage.setItem("jwtToken", '');
        }
      }
      return Promise.reject(error);
    });
  }

  get(url, params){
    let token = localStorage.getItem('jwtToken');
    if(token !== ''){
      return axios.get((url.startsWith('http') ? '' : this.backendUrl) + url, {withCredentials: true, headers: {'Authorization': 'Bearer ' + token}, params: params})
    }
    else{
      return axios.get((url.startsWith('http') ? '' : this.backendUrl) + url, {params: params});
    }
  }

  post(url, json){
    let token = localStorage.getItem('jwtToken');
    if(token !== ''){
      return axios.post((url.startsWith('http') ? '' : this.backendUrl) + url, json, {withCredentials: true, headers: {'Authorization': 'Bearer ' + token}});
    }
    else{
      return axios.post((url.startsWith('http') ? '' : this.backendUrl) + url, json);
    }
  }
}

export default GeneralService;
