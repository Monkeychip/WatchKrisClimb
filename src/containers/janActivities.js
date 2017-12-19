/*import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities } from '../actions/index';

class ActivitiesJan extends Component {
	constructor(props){
		super(props)
		this.state = {term: 'heys'};
		this.getData = this.getData.bind(this);
	}
	getData(){
		this.props.fetchActivitiesJan();
	}

	componentDidMount(){this.getData();}
	render(){
		if(!this.props.activities){
			return(
				<div>Loading Activities ...</div>
			);
		}
		let janActivities = this.props.activities; //array
		let addJanActivities = (a,b) => a +b
		let arrayJanElevationGain = [];
		janActivities.forEach(activity => arrayJanElevationGain.push(activity.total_elevation_gain))
		let sumJanActivities = parseInt(arrayJanElevationGain.reduce(addJanActivities)/.3048,10);
		return (
			<div id="wtf">{sumJanActivities.toLocaleString()}</div>
		)
	}
}


function mapStateToProps({activities}) {
	return {activities};
}

function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivitiesJan}, dispatch); }

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesJan); 

*/
//return activities data
//if activities data is < start_date_local 2017-02-01T00:00:00Z than accumulate
//maybe use filter for that line.

