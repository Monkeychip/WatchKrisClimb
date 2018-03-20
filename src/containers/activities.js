import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities } from '../actions/actions_index';

function sumElevation(allActivities) {
		let addActivities = (a,b) => a + b 
		let arrayElevationGain = [];
		allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
		let sumActivities = 0;
		if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) }
        return sumActivities;
}

function monthElevation(monthData,timestamp) {
    
     let monthActivity = monthData.filter( //added data to widdle down
     function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate <  timestamp);  //today < 2017
    }
  )
    
  return sumElevation(monthActivity); // now with correct array run through the Sum Elevation and return that value  
}


class Activities extends Component {

	
	componentDidMount() { this.props.activitiesArray; }
	render() {
		if(!this.props.activitiesArray) {
			return(
				<div>Loading Activities ...</div>
			);
		}
		let year = (new Date()).getFullYear();
    	let month = 0; 
    	let totalElevation = sumElevation(this.props.activitiesArray);
    	let lastYearsElevation = monthElevation(this.props.activitiesArray, new Date(year, month, -1).getTime());

		return (	
            <div id="activities_header">{`Total Climbed this Year:`}<span id="elevation_total"><br/>{`${(totalElevation - lastYearsElevation).toLocaleString()} ft`}</span></div>
        )
       
    }
}

function mapStateToProps(state) {
	return {
		activitiesArray: state.activities
	};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchActivities}, dispatch);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Activities); 




