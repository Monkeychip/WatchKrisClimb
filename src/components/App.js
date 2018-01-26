import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
import AGPieChart from '../containers/pieChart';
import Header from './header';

//sixteen wide mobile eight wide tablet four wide computer column
class App extends Component {
  render() {
    return (
      <div id="component_holder" className="ui centered grid container"> 
          <div className="sixteen wide column">
            
            <h2 className="ui header" id="intro-header">Strava data tailored to your winter needs</h2>
              <p>We all love Strava, but it was not built for backcountry skiers.  Why would it be?
                <br /> Strava is headquartered in the windy, snowless city of San Francisco.
                <br /> I can't give you everything, but I can give you a bit more than Strava does. 
            </p>
          </div>
          <div className="sixteen wide column">
            <Header />
            {this.props.children}
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
