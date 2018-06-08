import React, { Component } from 'react';
import {SurveyService} from './SurveyService.js';
import {Message} from 'primereact/components/message/Message';
import {Button} from 'primereact/components/button/Button';
import {
  withRouter
} from 'react-router-dom';

class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {test: {response: null}};
    this.surveyService = new SurveyService();
    this.onGoToHomePage = this.onGoToHomePage.bind(this);
  }

  componentDidMount() {
    this.surveyService.getSurvey().then(
        res => {
          this.setState(() => ({test: res.data}))
        }
    ).catch(error => {
        this.props.history.push('/');
      }
    );
  }

  onGoToHomePage(){
    this.props.history.push('/');
  }

  render(){
    return(
      <div className="ui-g">
        <div className="ui-g-1" />
        <div className="ui-g-10 text-center"
             style={{marginTop: '20px' }}>
          <div>
            <Message severity="warn"
                     text="Not yet available. This is future functionality where you will be able to create new survey and send to respondents." />
            <div style={{paddingTop:'20px'}}>
              <Button label="Go to Home Page"
                      onClick={this.onGoToHomePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Survey);
