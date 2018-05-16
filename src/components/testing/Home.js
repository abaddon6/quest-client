import React, { Component } from 'react';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
import logo from './logo.png';
import {RestService} from './RestService';
import { login, logout, isLoggedIn } from './AuthService';
import {
  Redirect,
  Link
} from 'react-router-dom';
import qs from 'query-string'

class Home extends Component {

  constructor(props) {
      super(props);
      if(qs.parse(props.location.search).token != null){
        localStorage.setItem('jwtToken', qs.parse(props.location.search).token);
      }
      this.state = {error: false, count: 0, checked: '', test: {response: ''}};
      this.increment = this.increment.bind(this);
      this.onCityChange = this.onCityChange.bind(this);
  }

  componentDidMount() {
      //login();
      new RestService().getTestResult().then(
          res => {
            console.log(res.headers);
            this.setState(() => ({error: false, count: 0, checked: '', test: res.data,}))
          }
      ).catch(error => {
          this.setState(() => ({error: true, count: 0, checked: '', test: {response: ''}}))
        }
      );
  }

  increment() {
      this.setState({count: this.state.count + 1, checked: ''});
  }

  onCityChange(e) {
      this.setState({count: this.state.count, checked: e.value});
  }

  render(){
  //  if(this.state.error === true){
  //    return <Redirect to='/dashboard' />;
  //  }
  //  else{
    return (
      <div>
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to PrimeReact</h2>
    </div>
    {
     ( isLoggedIn() ) ? <Link to="/special">Celebrity Jokes</Link> :  ''
    }
    <div className="App-intro" style={{fontAlign: 'left'}}>
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
    <div>{this.state.test.response}</div>
    </div>);}
//  }
}

export default Home;
