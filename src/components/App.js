import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
//import AGPieChart from '../containers/pieChart';
//import Table from './table';
import Menu from './menu';
import Signin from '../containers/goal';
import {connect} from 'react-redux'; 


//sixteen wide mobile eight wide tablet four wide computer column
class App extends Component {

  render() {
    return (

      <div id="component_holder" className="ui centered grid container"> 
      {this.props.children}
          <Menu />
          
          <div className="row">
             <h2 id="text-counter" className="ui middle aligned center aligned grid"><Activities /></h2>
          </div>
         <div id="activitiesChart" className="sixteen wide column">
              <ActivitiesChart />
         </div>
       {/* <div id="goal-input">
            <Signin onSubmit={this.submit} />
         </div>
         <div id="metrics_table" className="ui centered grid container">
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
