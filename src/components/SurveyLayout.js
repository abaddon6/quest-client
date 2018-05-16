import React, { Component } from 'react';
import Survey from './survey/Survey.js';
import QS from 'query-string'
import logo from '../resources/images/logo.svg';

class SurveyLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {surveyToken: QS.parse(props.location.search).surveyToken};
  }

  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg ui-widget-header">
          <img className="navbar-brand" src={logo} alt="logo" />
          <span className="navbar-brand">Quest - surveys with expert system</span>
        </nav>
        <div>
          <Survey surveyToken={this.state.surveyToken} />
        </div>
      </div>
    );
  }
}

export default SurveyLayout;
