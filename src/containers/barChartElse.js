import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data
import { sumElevationHelper, filterElevationDataHelper, barOptions } from '../helperFunctions';


export class BarChartElse extends Component {	
  constructor(props){
    super(props);
  }

  getElseActvitiesWeek(){
    let lastSunday = moment().startOf('isoWeek').valueOf(); 
    let filteredData = filterElevationDataHelper(this.props.activitiesArray, lastSunday, "else"); //else is a keyword here see helperFunctions
    let weekElseElevationGain = sumElevationHelper(filteredData);
    return weekElseElevationGain; 
  }

  render() {
    if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    let weekElseTotal = this.getElseActvitiesWeek();
        
  	const data = {
	  labels: ['Else'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [weekElseTotal]
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
    activitiesArray: state.activities 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartElse);



 