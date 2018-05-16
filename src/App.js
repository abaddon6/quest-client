import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/redmond/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import SurveyLayout from './components/SurveyLayout.js';
import AdminLayout from './components/admin/AdminLayout.js';
import ErrorBoundary from './components/ErrorBoundary';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <ErrorBoundary>
            <Switch>
              <Route path="/admin" component={AdminLayout} />
              <Route exact path="/*" component={SurveyLayout} />
              <Route component={ErrorBoundary} />
            </Switch>
          </ErrorBoundary>
        </div>
      </Router>
    );
  }
}

export default App;
