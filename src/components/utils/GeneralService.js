import axios from 'axios';

export class GeneralService {

  backendUrl = 'http://127.0.0.1:8080/quest/';

  get(url){
    var token = localStorage.getItem('jwtToken');
    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    if(token !== 'null'){
      return axios.get(this.backendUrl + url, {withCredentials: true, headers: {'Authorization': 'Bearer ' + token}});
    }
    else{
      return axios.get(this.backendUrl + url);
    }
  }
}
