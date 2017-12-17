import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import {fetchActivities} from '../actions/index'; 

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
		let allActivities = this.props.activities; //array	
		let addActivities = (a,b) => a + b 
		let arrayElevationGain = [];
		allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
        let sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10); //convert to ft.
		return (	
            <div id="activities_test">{`${sumActivities.toLocaleString()} ft`}</div>
        )
       
    }
}


function mapStateToProps({activities}) {
	return {activities};
}

function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivities}, dispatch); }

export default connect(mapStateToProps, mapDispatchToProps)(Activities); 
