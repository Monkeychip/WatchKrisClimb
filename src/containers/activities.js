import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import {fetchActivities} from '../actions/actions_index'; 

//SumElevation outsid eof the component
function sumElevation(allActivities) {
		let addActivities = (a,b) => a + b 
		let arrayElevationGain = [];
		allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
        let sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10); //convert to ft.
        return sumActivities.toLocaleString();
}

class Activities extends Component {
	constructor(props) { 
		super(props) 
		this.state = {term: 'heys'};
		this.getData = this.getData.bind(this);
	}
	getData(){
		this.props.fetchActivities();
	}
	
	componentDidMount() {this.getData(); }
	render() {
		if(!this.props.activities) {
			return(
				<div>Loading Activities ...</div>
			);
		}
		return (	
            <div id="activities_header">{`Total Climbed to Date: `}<span id="elevation_total">{`${sumElevation(this.props.activities)} ft`}</span></div>
        )
       
    }
}

//takes application state activities state as an argument, and returns it. 
// redux has a global application state which is what is being passed. 
// the return is what shows up as props inside of Activities
// now the return is avaliable as props
//if application state changes, say you add another activity in Strava, container instantly rerenders... not sure about strava.
function mapStateToProps({activities}) {
	return {activities};
}
//activities above references the combine reducers key !!!

function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivities}, dispatch); }
//connect is forming bridge between redux and react CONTAINERS are the bridge.  connect is a function
//now exporting the container instead of just the class Activities
export default connect(mapStateToProps, mapDispatchToProps)(Activities); 




