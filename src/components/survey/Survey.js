import React, { Component } from 'react';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Panel} from 'primereact/components/panel/Panel';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Message} from 'primereact/components/message/Message';
import {DataView} from 'primereact/components/dataview/DataView';
import {Button} from 'primereact/components/button/Button';
import {Tooltip} from 'primereact/components/tooltip/Tooltip';
import {Card} from 'primereact/components/card/Card';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {SurveyService} from './SurveyService.js';
import {AttemptService} from './AttemptService.js';
import {ValidationService} from '../utils/ValidationService.js';
import devOpsImg from '../../resources/images/devops.png';
import testImg from '../../resources/images/test.jpg';

class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {surveys: [],
                  visible: false,
                  email: '',
                  name: '',
                  existingAttempt: true,
                  validEmail: false,
                  emailSend: false};
    this.surveyService = new SurveyService();
    this.attemptService = new AttemptService();
    this.validationService = new ValidationService();
    this.onHide = this.onHide.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  componentDidMount() {
    this.surveyService.getAllSurveys().then(
        res => {
          this.setState(() => ({surveys: res.data}))
        }
    );
  }

  onHide(event) {
    this.setState({visible: false,
                   email: '',
                   name: '',
                   validEmail: false,
                   emailSend: false});
  }

  startSurvey() {
    this.attemptService.createAttempt(this.state.selectedSurvey.surveyId, this.state.email, this.state.name, this.state.existingAttempt).then(
        res => {
          this.setState(() => ({emailSend: true}))
        }
    );
  }

  checkEmail(e) {
    this.setState({email: e.target.value, validEmail: this.validationService.validateEmail(e.target.value)});
  }

  itemTemplate(survey ,layout) {
    return (
      <div style={{ padding: '.5em' }}
           className="ui-g-12 ui-md-6 ui-lg-4">
        <Panel header={survey.name}>
          <div className="text-center"
               style={{width: '100%'}}>
            <img src={survey.name === 'Test Assesment' ? testImg : devOpsImg}
                 alt="DevOps"
                 style={{width:'80%'}} />
          </div>
            <div style={{paddingTop:'10px'}}>
              {survey.description}
            </div>
            <hr className="ui-widget-content"
                style={{ borderTop: 0 }} />
            <div className="text-center"
                 style={{ cursor: 'pointer'}}>
              <i id="start-survey"
                 className="fa fa-edit fa-2x primary"
                 onClick={(e) => this.setState({selectedSurvey: survey, visible: true })} />
              <Tooltip for="#start-survey"
                       tooltipPosition="top"
                       showDelay={1000}
                       hideDelay={500}
                       title="Starting survey" />
            </div>
        </Panel>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Card subtitle="Welcome to Quest survey with expert system which is provided by DRS team. Here you can find available surveys.">
          <DataView value={this.state.surveys}
                    itemTemplate={this.itemTemplate.bind(this)}
                    layout="grid" />
          <Dialog header="Starting survey"
                  visible={this.state.visible}
                  modal={true}
                  width="400px"
                  onHide={this.onHide}>
            <Card subtitle="Please provide your e-mail address on whcih link to survey will be send. Additionally you can provide your name or name of your project.">
              <span className="ui-float-label"
                    style={{marginTop:'30px'}}>
                <InputText id="email-input"
                           keyfilter="email"
                           type="text"
                           size="38"
                           maxLength="100"
                           value={this.state.email}
                           onChange={this.checkEmail} />
                <label style={this.state.validEmail ? {} : {color:'red'}}
                       htmlFor="email-input">
                  E-mail {this.state.email === '' ? '*' : (this.state.validEmail ? '' : ' (invalid)')}
                </label>
              </span>
              <span className="ui-float-label"
                    style={{marginTop:'20px'}}>
                <InputText id="name-input"
                           type="text"
                           size="38"
                           maxLength="50"
                           value={this.state.name}
                           onChange={(e) => this.setState({name: e.target.value})} />
                <label htmlFor="name-input">
                  Name
                </label>
              </span>
              <div style={{marginTop:'20px'}}>
                <Checkbox inputId="continue-attempt" value="New York" onChange={(e) => this.setState({existingAttempt: e.checked})} checked={this.state.existingAttempt}></Checkbox>
                <label htmlFor="continue-attempt">Continue existing attempt</label>
              </div>
              <Button label="Send"
                      style={{marginTop:'20px'}}
                      disabled={this.state.validEmail ? '' : 'disabled'}
                      onClick={this.startSurvey}  />
              {this.state.emailSend ?
                <div style={{paddingTop:'20px'}}>
                  <Message severity="success"
                           text="E-mail with link to start survey was send. Please receive it and click link to start survey. This window can be closed." />
                </div> : ''}
            </Card>
          </Dialog>
        </Card>
      </div>
    );
  }
}

export default Survey;
