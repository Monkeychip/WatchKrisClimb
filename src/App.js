import React, { Component } from 'react';
import './App.css';

import Activities from './containers/activities';
import ActivitiesChart from './containers/activitiesChart';
import AGPieChart from './containers/pieChart';
import {connect} from 'react-redux'; 

//sixteen wide mobile eight wide tablet four wide computer column
class App extends Component {
  render() {
    return (
      <div id="component_holder" className="ui centered grid"> 
          <div className="sixteen wide column">
            <div id="page_title" className="ui center aligned huge header">watchkrisclimb.com</div>
          </div>
         <div id="activitiesChart" className="sixteen wide column">
              <ActivitiesChart />
         </div>
             <AGPieChart />
        <div className="row">
          <div className="ten wide column">
           <h3 id="text-counter" className="ui middle aligned center aligned grid"><Activities /></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
