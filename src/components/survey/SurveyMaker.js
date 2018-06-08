import React, { Component } from 'react';
import {AttemptService} from './AttemptService.js';
import SectionCarousel from './section-carousel/SectionCarousel.js';
import QuestionAnswer from './question-answer/QuestionAnswer.js';
import AttemptSummary from './attempt-summary/AttemptSummary.js';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import devOpsImg from '../../resources/images/devops.png';
import QS from 'query-string'
import {
  withRouter
} from 'react-router-dom';

class SurveyMaker extends Component {

  constructor(props) {
    super(props);
    this.state = {attemptId: props.attemptId,
                  summary: props.summary,
                  attempt: {survey: {sections: [], respondingQuestion:{}, respondingSection: {}}, userGroup:{}},
                  question: {answers: [], links: []},
                  section: {}};

    this.attemptService = new AttemptService();

    this.onChangeSection = this.onChangeSection.bind(this);
    this.onAnswered = this.onAnswered.bind(this);
    this.onPreviousQuestion = this.onPreviousQuestion.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onBackToAnswer = this.onBackToAnswer.bind(this);
    this.onGoToHomePage = this.onGoToHomePage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let summary = QS.parse(nextProps.location.search).summary;
    let attemptId = QS.parse(nextProps.location.search).attemptId;
    this.loadData(attemptId, summary)
  }

  componentDidMount() {
    this.loadData(this.state.attemptId, this.state.summary)
  }

  loadData(attemptId, summary) {
    if(attemptId){
      if(summary){
        this.attemptService.getAttemptSummary(attemptId).then(
          res => this.refreshAttempt(res, summary)
        );
      }
      else{
        this.attemptService.getAttempt(attemptId).then(
          res => this.refreshAttempt(res)
        );
      }
    }
    else{
      window.location.reload();
    }
  }

  onChangeSection(sectionId) {
    this.attemptService.getAttemptForSection(this.state.attemptId, sectionId).then(
      res => this.refreshAttempt(res)
    );
  }

  onAnswered(e) {
    let responses = [{answerId: e.value}];
    this.attemptService.setResponsesForQuestionFromAttempt(this.state.attemptId, this.state.question.questionId, responses).then(
        res => this.state.question.next ? this.onNextQuestion(e) : this.refreshAttempt(res)
    );
  }

  onPreviousQuestion(e) {
    if(this.state.question && this.state.question.previous){
      let url = "";
      for(var i in this.state.question.links){
        if(this.state.question.links[i].rel === 'previous'){
          url = this.state.question.links[i].href;
        }
      }
      this.attemptService.get(url).then(
        res => this.refreshAttempt(res)
      );
    }
  }

  onDone(e){
    this.props.history.push('/?attemptId=' + this.state.attemptId + "&summary=maturity");
  }

  onNextQuestion(e) {
    if(this.state.question && this.state.question.next){
      let url = "";
      for(var i in this.state.question.links){
        if(this.state.question.links[i].rel === 'next'){
          url = this.state.question.links[i].href;
        }
      }
      this.attemptService.get(url).then(
        res => this.refreshAttempt(res)
      );
    }
  }

  onBackToAnswer(){
    this.props.history.push('/?attemptId=' + this.state.attemptId);
  }

  onGoToHomePage(){
    this.props.history.push('/');
  }

  refreshAttempt(res, summary) {
    if(res.data) {
    this.setState(() => ({attempt: res.data,
                          question: this.setLinks(res.data.survey.respondingQuestion),
                          section: res.data.survey.respondingSection,
                          summary: summary}));
    }
  }

  setLinks(object){
    if(object && object.links){
      for(var i in object.links){
        if(object.links[i].rel === 'next'){
          object.next = true;
        }
        if(object.links[i].rel === 'previous'){
          object.previous = true;
        }
      }
    }
    return object;
  }

  render(){
    if(!this.state.attempt.attemptId){
      return(
        <div className="text-center">
          <hr className="ui-widget-content"
              style={{ borderTop: 0 }} />
          <ProgressSpinner />
        </div>
      );
    }

    let content = "";
    if(this.state.summary){
      content =
      <div className="ui-g">
        <div className="ui-g-1" />
        <div className="ui-g-10">
          <AttemptSummary mode={this.state.summary}
                          finished={this.state.attempt.survey.numberOfResponses === this.state.attempt.survey.numberOfQuestions}
                          sections={this.state.attempt.survey.sections}
                          onBackToAnswer={this.onBackToAnswer}
                          onGoToHomePage={this.onGoToHomePage} />
        </div>
      </div>
    }
    else{
      content =
      <div>
      <SectionCarousel sections={this.state.attempt.survey.sections}
                       section={this.state.section}
                       currentQuestion={this.state.question}
                       onChangeSection={this.onChangeSection} />
      <div className="ui-g">
        <div className="ui-g-1" />
        <div className="ui-g-10">
          <QuestionAnswer question={this.state.question}
                          section={this.state.section}
                          allAnswered={this.state.attempt.survey.numberOfResponses===this.state.attempt.survey.numberOfQuestions}
                          onNextQuestion={this.onNextQuestion}
                          onPreviousQuestion={this.onPreviousQuestion}
                          onAnswered={this.onAnswered}
                          onDone={this.onDone} />
        </div>
      </div>
      </div>
    }

    return(
      <div>
        <div className="ui-g">
          <div className="ui-g-2">
            <img className="img-fluid"
                 src={devOpsImg}
                 alt="DevOps" />
          </div>
          <div className="ui-g-10">
            <div>
              <h4>{this.state.attempt.survey.name + (this.state.summary ? ' - Summary' : " (" + this.state.attempt.survey.numberOfResponses + "/" + this.state.attempt.survey.numberOfQuestions + ")")}</h4>
            </div>
            <div>
              {"Welcome " + (this.state.attempt.userGroup.name !== '' ? this.state.attempt.userGroup.name : this.state.attempt.userGroup.email) + (this.state.summary ? ". Pleace check your results!" : ". Good luck!")}
            </div>
          </div>
        </div>
        {content}
      </div>
    );
  }
}
export default withRouter(SurveyMaker);
