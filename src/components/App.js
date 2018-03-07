import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
//import AGPieChart from '../containers/pieChart';
//import Table from './table';
import Menu from './menu';
import Signin from '../containers/goal';
import {connect} from 'react-redux'; 

class App extends Component {

  render() {
    return (

      <div id="component_holder" className="ui centered grid container "> 
          <Menu />
          {this.props.children}    
          <div className="row">
             <h2 id="text-counter" className="ui middle aligned center aligned grid"><Activities /></h2>
          </div>
         <div id="activitiesChart" className="sixteen wide column">
              <ActivitiesChart />
         </div>
       {/*
         <div className="ui centered grid container">
             <AGPieChart />
         </div>*/}
      </div>
    );
  }
}


export default App;

