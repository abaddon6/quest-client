import React, { Component } from 'react';
import Survey from './survey/Survey.js';
import logo from '../../resources/images/logo.svg';
import qs from 'query-string'

class AdminLayout extends Component {

  constructor(props) {
    super(props);
    localStorage.setItem('jwtToken', qs.parse(props.location.search).token);
  }

  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg ui-widget-header">
          <img className="navbar-brand" src={logo} alt="logo" />
          <span className="navbar-brand">Quest - surveys with expert system - administration</span>
        </nav>
        <div>
          <Survey />
        </div>
      </div>
    );
  }
}

export default AdminLayout;
