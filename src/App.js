import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import {RestService} from './RestService';

class App extends Component {
    
    constructor() {
        super();
this.state = {count: 0, checked: '', test: {testStatus: ''}};
        this.increment = this.increment.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
    }
    
    componentDidMount() {
        new RestService().getTestResult().then(data => this.setState({count: 0, checked: '', test: data}));
    }
    
    increment() {
        this.setState({count: this.state.count + 1, checked: ''});
    }
    
    onCityChange(e) {
        this.setState({count: this.state.count, checked: e.value});
    }
    
    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to PrimeReact</h2>
            </div>
            <div className="App-intro" style={{fontAlign: 'left'}}>             
              <p>{this.state.test.testStatus}</p>
              <p>Which method are you using? What are the regular events (and how long are those)?</p>
              <RadioButton value="3" onChange={this.onCityChange} checked={this.state.checked === '3'} />
              <label htmlFor="rb1">Waterfall is in place. Releses are rare due to long process and long phases on the way.</label>
              <br/>
              <RadioButton value="1" onChange={this.onCityChange} checked={this.state.checked === '1'} />
              <label htmlFor="rb2">Agile methodology is in place but implementation of it is not good. Process still looks pretty much waterfallish</label>
              <br/><br/>
	          {this.state.checked !== '' &&
	              <label>Your score is: {this.state.checked}</label>
	          }	          
            </div>
          </div>
        );
    }
}

export default App;
