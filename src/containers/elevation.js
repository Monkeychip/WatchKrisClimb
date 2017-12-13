//I made the container folder and this file
import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import {fetchElevation} from '../actions/index'; 

class Elevation extends Component {
	constructor(props) { 
		super(props) 
		this.state = {term: 'hey'};
		this.getData = this.getData.bind(this);
	}
	getData(){
		this.props.fetchElevation();
	}

	componentDidMount() {this.getData(); }
	render() {
		if(!this.props.elevation) {
			return(
				<div>Loading Elevation ...</div>
			);
		}
		let totalElevation = this.props.elevation.ytd_ride_totals.elevation_gain + this.props.elevation.ytd_run_totals.elevation_gain
		return (
            <div id="elevation_test">{JSON.stringify(totalElevation)}</div>
        )
       
    }
}


function mapStateToProps({elevation}) {
	//console.log(activities);
	return {elevation};
}

function mapDispatchToProps(dispatch){ return bindActionCreators({fetchElevation}, dispatch); }

export default connect(mapStateToProps, mapDispatchToProps)(Elevation); 