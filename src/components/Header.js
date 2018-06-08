import React, { Component } from 'react';
import {Button} from 'primereact/components/button/Button';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Message} from 'primereact/components/message/Message';
import {Card} from 'primereact/components/card/Card';
import {ValidationService} from './utils/ValidationService.js';
import {AuthService} from './utils/AuthService.js';
import {
  withRouter
} from 'react-router-dom';
import logo from '../resources/images/logo.svg';
import qs from 'query-string'

class Header extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('jwtToken') === ''){
      localStorage.setItem('jwtToken', props.location ? (qs.parse(props.location.search).token ? qs.parse(props.location.search).token : '') : '');
    }
    this.state = {visible: false, email: '', validEmail: false, emailSend: false};
    this.validationService = new ValidationService();
    this.authService = new AuthService();
    this.onHide = this.onHide.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.login = this.login.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  onHide(event) {
    this.setState({visible: false});
  }

  checkEmail(e) {
    this.setState({email: e.target.value, validEmail: this.validationService.validateEmail(e.target.value)});
  }

  checkLogin(e){
    if(localStorage.getItem('jwtToken') !== ''){
      localStorage.setItem("jwtToken", '');
      this.props.history.push('/');
    }
    else{
      this.setState({visible: true });
    }
  }

  login() {
    this.authService.login(this.state.email).then(
        res => {
          this.setState(() => ({emailSend: true}))
        }
    );
  }

  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg ui-widget-header">
          <a className="navbar-brand"
             href="">
            <img src={logo}
                 alt="logo" />
          </a>
          <div className="navbar-brand">
            Quest - {localStorage.getItem('jwtToken') !== '' ? " administration" : "surveys with expert system"}
          </div>
          <div className="navbar-nav ml-auto">
            <div className="nav-item">
              <div className="nav-link">
                <Button label={localStorage.getItem('jwtToken') !== '' ? "Admin Logout" : "Admin Login"}
                        onClick={this.checkLogin} />
              </div>
            </div>
          </div>
        </nav>
        <Dialog header="Login as administrator"
                visible={this.state.visible}
                modal={true}
                width="400px"
                onHide={this.onHide}>
          <Card subtitle="Please provide your e-mail address on whcih authentication link will be send.">
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
            <Button label="Login"
                    style={{marginTop:'20px'}}
                    disabled={this.state.validEmail ? '' : 'disabled'}
                    onClick={this.login}  />
            {this.state.emailSend ?
              <div style={{paddingTop:'20px'}}>
                <Message severity="success"
                         text="E-mail with link to start survey was send. Please receive it and click link to start survey. This window can be closed." />
              </div> : ''}
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(Header);
