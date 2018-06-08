import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/redmond/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import Header from './components/Header.js';
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
      <div className="container">
        <Router>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route path="/admin" component={AdminLayout} />
              <Route exact path="/*" component={SurveyLayout} />
              <Route component={ErrorBoundary} />
            </Switch>
          </ErrorBoundary>
        </Router>
      </div>
    );
  }
}

export default App;
