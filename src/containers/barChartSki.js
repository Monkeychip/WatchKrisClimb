import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data
import { sumElevationHelper, filterElevationDataHelper, barOptions } from '../helperFunctions';


class BarChartSki extends Component {

  constructor(props){
    super(props);
  }

  getSkiActvitiesWeek(){
    let lastSunday = moment().startOf('isoWeek').valueOf(); 
    let filteredData = filterElevationDataHelper(this.props.activitiesArray, lastSunday, "BackcountrySki");
    let weekSkiElevationGain = sumElevationHelper(filteredData);
    return weekSkiElevationGain; 
  }
  
  render() {

    if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    let weekSkiTotal = this.getSkiActvitiesWeek();
    
    
  	const data = {
	  labels: ['Ski'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [weekSkiTotal]
	    }
	  ]
	};

   return (
      <div>
      	
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchActivities } , dispatch)
}

/* CONNNECTING TO APPLICATION STATE*/
function mapStateToProps(state){

  return {
    activitiesArray: state.activities // this.props.activitiesArray now accessible in the component.
    //whatever container here is === this.props of component asdf: 123 this.props.asdf == 123
    //see the reducer key for getting activiites name
  }
}
//connect function says take component, and return container
export default connect(mapStateToProps, mapDispatchToProps)(BarChartSki);
//export default BarChartSki;

