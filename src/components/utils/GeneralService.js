import axios from 'axios';

export class GeneralService {
  get(url){
    var token = localStorage.getItem('jwtToken');
    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    if(token !== 'null'){  
      return axios.get(url, {withCredentials: true, headers: {'Authorization': 'Bearer ' + token}});
    }
    else{
      return axios.get(url);
    }
  }
}
