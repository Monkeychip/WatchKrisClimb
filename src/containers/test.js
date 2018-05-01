import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import { fetchThisYear } from '../actions/actions_index';

class Test extends Component {

	
	componentWillMount() { //this.props.fetchThisYear()}
	}
	render() {
		if(!this.props.thisYear) {
			return(
				<div>Testing....</div>
			);
		}
		return (	
            <div id="activities_header">{`test:`}<span id="elevation_total"><br/>{this.props.thisYear}</span></div>
        )
       
    }
}
/*NOT SURE I NEED THIS HERE*/
function mapStateToProps(state) {
	return {
		thisYear: state.activitiesThisYear,
	};	
}


export default connect(mapStateToProps)(Test);


