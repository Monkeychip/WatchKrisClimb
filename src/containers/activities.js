import React, { Component } from 'react';
import { connect } from 'react-redux';  //direct connection to the state redux, which container the thisYearsActivities property on the application state.


function sumElevation(allActivities) {
		let addActivities = (a,b) => a + b 
		let arrayElevationGain = [];
		allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
		let sumActivities = 0;
		if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) }
        return sumActivities;
}



class Activities extends Component {

	render() {
		if(!this.props.thisYear) {
			return(
				<div>Loading Activities ...</div>
			);
		}
		return (	
            <div id="activities_header">{`Total Climbed this Year:`}<span id="elevation_total"><br/>{`${sumElevation(this.props.thisYear).toLocaleString()} ft`}</span></div>
        )
       
    }
}

function mapStateToProps(state) {
	return {
		thisYear: state.thisYearsActivities 
	};
}

export default connect(mapStateToProps)(Activities); 


/*do not need to connect to a action creator because of it's already connected on activitiesChart*/