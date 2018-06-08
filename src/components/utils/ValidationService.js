export class ValidationService {
  validateEmail(email) {
    let emailValid = false;
    if(email !== null) {
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null ? false : true;
    }
    return emailValid;
  }
}
