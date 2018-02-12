import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
import Goal from '../containers/goal';
//import AGPieChart from '../containers/pieChart';
//import Table from './table';
import Menu from './menu';



//sixteen wide mobile eight wide tablet four wide computer column
class App extends Component {

  render() {
    return (
      <div id="component_holder" className="ui centered grid container"> 
          <Menu />
          
          <div className="row">
             <h2 id="text-counter" className="ui middle aligned center aligned grid"><Activities /></h2>
          </div>
         <div id="activitiesChart" className="sixteen wide column">
              <ActivitiesChart />
         </div>
        <div id="goal-input">
              <Goal /> 
         </div>
         {/*<div id="metrics_table" className="ui centered grid container">
              <p>Using you Backcountry labeled activities only, here's a break down of your data.</p>
             <Table />
         </div>
         <div className="ui centered grid container">
             <AGPieChart />
         </div>*/}
      </div>
    );
  }
}

export default App;
