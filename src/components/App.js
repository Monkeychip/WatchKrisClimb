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
            
            <h2 className="ui dividing header" id="intro-header">Strava data tailored to your winter needs</h2>
              <p>Strava data re-adjusted to better reflect the ups, ups, and downs of backcountry winter activities.  Try it out and the graphs will re-populate with your Strava data</p>
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
