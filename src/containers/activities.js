//I made the container folder and this file
import React, {Component} from 'react';
import {connect} from 'react-redux'; //imported but some warnings
import {bindActionCreators} from 'redux';
import {fetchActivities} from '../actions/index'; // created this folder under src

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
		let totalActivites = this.props.actvities
		return (
            <div id="activities_test">{JSON.stringify(totalActivites)}</div>
        )
       
    }
}


function mapStateToProps({activities}) {
	return {activities};
}

function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivities}, dispatch); }

export default connect(mapStateToProps, mapDispatchToProps)(Activities); 
