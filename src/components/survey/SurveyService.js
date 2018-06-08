import {GeneralService} from '../utils/GeneralService.js';

export class SurveyService extends GeneralService{
  getAllSurveys() {
    return this.get('surveys/');
  }
}
