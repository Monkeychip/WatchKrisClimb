import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
import Menu from './menu';
import Test from '../containers/test';


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
         <div>
           
         </div>
      </div>
    );
  }
}
//UNSURE WHY GOAL IS NOT RENDERED HERE>

export default App;

