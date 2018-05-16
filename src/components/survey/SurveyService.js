import {GeneralService} from '../utils/GeneralService.js';

export class SurveyService extends GeneralService{
  getSurvey() {
    return this.get('http://127.0.0.1:8080/quest/survey/');
  }
}
