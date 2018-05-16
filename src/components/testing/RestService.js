import axios from 'axios';

export class RestService {

    getTestResult() {
      console.log(localStorage.getItem('jwtToken'));
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      if(localStorage.getItem('jwtToken') != null){
        var token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', null)
        return axios.get('http://127.0.0.1:8080/quest/admin/survey/', {withCredentials: true, headers: {'Authorization': 'Bearer ' + token}});
      }
      else{
        return axios.get('http://127.0.0.1:8080/quest/admin/survey/', {withCredentials: true});
      }
    }

}
