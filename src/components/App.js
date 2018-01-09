import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
import AGPieChart from '../containers/pieChart';
import {connect} from 'react-redux';
import LoginButton from './modal'; //importing the default, which is why you don't use {} :/


//sixteen wide mobile eight wide tablet four wide computer column
class App extends Component {
  render() {
    return (
      <div id="component_holder" className="ui centered grid container"> 
          <div className="sixteen wide column">
            <div id="page_title" className="ui center aligned huge header">watchkrisclimb.com</div>
          </div>
          <div id="authenticationButton" className="sixteen wide column">
            <LoginButton />
         </div>
         <div id="activitiesChart" className="sixteen wide column">
              <ActivitiesChart />
         </div>
         <div className="ui centered grid container">
             <AGPieChart />
         </div>
        <div className="row">
          <div className="sixteen wide column">
           <h3 id="text-counter" className="ui middle aligned center aligned grid"><Activities /></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
/*
Redirect to this URL:
https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://watchkrisclimb.s3-website.us-east-2.amazonaws.com
https://www.strava.com/oauth/authorize?client_id=1529&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://sniktau.joshuawyse.com/login
*/