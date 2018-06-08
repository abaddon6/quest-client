import React, { Component } from 'react';
import Survey from './survey/Survey.js';
import SurveyMaker from './survey/SurveyMaker.js';
import QS from 'query-string'

class SurveyLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {attemptId: QS.parse(props.location.search).attemptId,
                  summary: QS.parse(props.location.search).summary};
  }

  render(){
    return(
      <div>
        {this.state.attemptId
          ?
            <SurveyMaker attemptId={this.state.attemptId} summary={this.state.summary} />
          :
            <Survey />
        }
      </div>
    );
  }
}

export default SurveyLayout;
