import React, { Component } from 'react';
import {SurveyService} from './SurveyService.js';

class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {test: {response: null}};
  }

  componentDidMount() {
    new SurveyService().getSurvey().then(
        res => {
          this.setState(() => ({test: res.data,}))
        }
    ).catch(error => {
        localStorage.setItem('jwtToken', null);
        this.setState(() => ({test: {response: null}}))
      }
    );
  }

  render(){
    return(
      <div>
        <div style={{margin: '30px'}}>Read from backend: {this.state.test.response}</div>
      </div>
    );
  }
}

export default Survey;
