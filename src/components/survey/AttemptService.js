import {GeneralService} from '../utils/GeneralService.js';

export class AttemptService extends GeneralService{
  getAttempt(attemptId) {
    return this.get('attempts/' + attemptId);
  }

  getAttemptForSection(attemptId, sectionId) {
    return this.get('attempts/' + attemptId + "/sections/" + sectionId);
  }

  createAttempt(surveyId, email, name, existingAttempt) {
    return this.post('attempts/', {surveyId: surveyId, email:  email, name: name, existingAttempt: existingAttempt});
  }

  setResponsesForQuestionFromAttempt(attemptId, questionId, responses){
    return this.post('attempts/' + attemptId + "/questions/" + questionId, responses);
  }

  getAttemptSummary(attemptId) {
    return this.get('attempts/' + attemptId + "/summary");
  }
}
