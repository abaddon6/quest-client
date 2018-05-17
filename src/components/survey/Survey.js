import React, { Component } from 'react';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {SurveyService} from './SurveyService.js';
import {AuthService} from '../utils/AuthService.js';

class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {surveyToken: props.surveyToken, checked: null, test: {response: null}, value: null, emailSend: false};
    this.onCityChange = this.onCityChange.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    new SurveyService().getSurvey().then(
        res => {
          this.setState(() => ({surveyToken: this.state.surveyToken, count: 0, checked: null, test: res.data, value: null, emailSend: false}))
        }
    ).catch(error => {
        localStorage.setItem('jwtToken', null);
        this.setState(() => ({surveyToken: this.state.surveyToken, count: 0, checked: null, test: {response: null}, value: null, emailSend: false}))
      }
    );
  }

  onCityChange(e) {
    this.setState(prevState => ({
      surveyToken: prevState.surveyToken,
      checked: e.value
    }));
  }

  startSurvey() {
    this.setState({surveyToken: 'test_token', checked: null});
  }

  login(){
    if(this.state.value != null){
      new AuthService().login(this.state.value).then(
          res => {
            this.setState(() => ({surveyToken: this.state.surveyToken, count: 0, checked: null, test:  {response: null}, value: null, emailSend: true}))
          }
      ).catch(error => {
          localStorage.setItem('jwtToken', null);
          this.setState(() => ({surveyToken: this.state.surveyToken, count: 0, checked: null, test: {response: null}, value: null, emailSend: false}))
        }
      );
    }
  }

  render(){
    if(this.state.surveyToken != null){
      return(
        <div>
          <div style={{margin: '30px'}}>Starting survey: {this.state.surveyToken}</div>
          <div className="content-section implementation">
            <div className="ui-g">
              <div className="ui-g-12">
                Which method are you using? What are the regular events (and how long are those)?
              </div>
              <div className="ui-g-12">
                <RadioButton inputId="rb1" value="3" onChange={this.onCityChange} checked={this.state.checked === '3'} />
                  <label htmlFor="rb1">Waterfall is in place. Releses are rare due to long process and long phases on the way.</label>
              </div>
              <div className="ui-g-12">
                <RadioButton inputId="rb2" value="1" onChange={this.onCityChange} checked={this.state.checked === '1'} />
                <label htmlFor="rb2">Agile methodology is in place but implementation of it is not good. Process still looks pretty much waterfallish</label>
              </div>
            </div>
            {this.state.checked !== null &&
                <label>Your score is: {this.state.checked}</label>
            }
          </div>
          <div style={{margin: '30px'}}>Read from backend: {this.state.test.response}</div>
        </div>
      );
    }
    else{
      return (
        <div style={{margin: '30px'}}>
          <Button label="Start survey" onClick={this.startSurvey} />
          <div style={{margin: '20px'}}>or login as administrator</div>
          <span className="ui-float-label">
            <InputText id="email-input" type="text" onChange={(e) => this.setState({value: e.target.value})} />
            <label htmlFor="email-input">E-mail address</label>
            <Button label="Login" onClick={this.login}  />
          </span>
          <br />
          {this.state.emailSend ? 'Authentication e-mail was send. Please receive it and click login link.' : ''}
        </div>
      );
    }
  }
}

export default Survey;
