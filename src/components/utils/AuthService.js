import {GeneralService} from './GeneralService.js';

export class AuthService extends GeneralService{
  login(emailAddress) {
    return this.get('auth?emailAddress=' + emailAddress);
  }
}
