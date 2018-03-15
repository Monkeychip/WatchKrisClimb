import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar, Chart } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data
import { sumElevationHelper, filterElevationDataHelper, barOptions } from '../helperFunctions';


class BarChartRun extends Component {

  constructor(props){
    super(props);
  }

  getRunActvitiesWeek(){
    let lastSunday = moment().startOf('isoWeek').valueOf(); 
    let filteredData = filterElevationDataHelper(this.props.activitiesArray, lastSunday, "Run");
    let weekRunElevationGain = sumElevationHelper(filteredData);
    return weekRunElevationGain; 
  }
	

  render() {

  	if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    let weekRunTotal = this.getRunActvitiesWeek();
    let xAxisMax = Number(localStorage.getItem('xAxisMax'));
    
  	const data = {
	  labels: ['Run'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [weekRunTotal]
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

function mapStateToProps(state){

  return {
    activitiesArray: state.activities 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartRun);
