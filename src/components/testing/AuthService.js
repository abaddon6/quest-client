import axios from 'axios';

export function login() {
    console.log(axios.get('http://127.0.0.1:8080/quest/login?token=token', {withCredentials: true}));
}

export function logout() {

}

export function isLoggedIn() {

}
