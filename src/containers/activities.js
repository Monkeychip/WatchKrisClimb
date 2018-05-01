import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchThisYear } from '../actions/actions_index';


function sumElevation(allActivities) {
		let addActivities = (a,b) => a + b 
		let arrayElevationGain = [];
		allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
		let sumActivities = 0;
		if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) }
        return sumActivities;
}



class Activities extends Component {

	componentDidMount() { this.props.fetchThisYear()}
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
/*NOT SURE I NEED THIS HERE*/
function mapStateToProps(state) {

	return {
		thisYear: state.activitiesThisYear
	};
	
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchThisYear}, dispatch);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Activities); 




