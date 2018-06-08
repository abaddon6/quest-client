import React, { Component } from 'react';
import Survey from './survey/Survey.js';

class AdminLayout extends Component {
  constructor(props){
    super(props);
    if(localStorage.getItem("jwtToken") === ''){
      props.history.push('/');
    }
  }

  render(){
    return(
      <div>
        {localStorage.getItem("jwtToken") !== '' ? <Survey /> : ''}
      </div>
    );
  }
}

export default AdminLayout;
