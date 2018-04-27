import axios from 'axios';

export class RestService {
    
    getTestResult() {
        return axios.get('http://127.0.0.1:8080/infratest/mq/result')
                .then(
                    res => res.data
                );
    }

}