import React, { Component } from 'react';
import '../App.css';
import Activities from '../containers/activities';
import ActivitiesChart from '../containers/activitiesChart';
import Menu from '../containers/menu';
import CreateItemModal from "../containers/testing";
import Amplify, { API } from 'aws-amplify';
import aws_exports from '../aws-exports';


Amplify.configure(aws_exports);

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
                <CreateItemModal/>
         </div>
      </div>
    );
  }
}


export default App;

/*This is the Parent component of activities, activitiesChart and menu. 
It's here that you want to record and save the state change of activities and activitiesThisYear (reducer properties)
*/