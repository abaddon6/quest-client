import {GeneralService} from '../../utils/GeneralService.js';

export class SurveyService extends GeneralService{
  getSurvey() {
    return this.get('surveys/1');
  }
}
