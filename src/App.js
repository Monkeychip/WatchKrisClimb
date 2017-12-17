import React, { Component } from 'react';
import './App.css';

import Activities from './containers/activities';
import ActivitiesChart from './containers/activitiesChart';
import AGPieChart from './containers/pieChart';
import {connect} from 'react-redux'; //imported but some warnings


class App extends Component {
  render() {
    return (
      <div id="component_holder" className="ui middle aligned center aligned grid">
        <div className="column">
           <div id="activitiesChart" className="ui middle aligned center aligned grid"><ActivitiesChart /></div>
           <div id="pieChart" className="ui middle aligned center aligned grid"><AGPieChart /></div>
           <h3 id="text-counter" className="ui center aligned header"><Activities /></h3>
        </div>
      </div>
    );
  }
}

export default App;

