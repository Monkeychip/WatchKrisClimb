import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
//import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index';
import { fetchActivities, fetchActivitiesWithCode, fetchCode } from '../actions/actions_index';

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
	constructor(props) { 
		super(props) 
		this.state = {term: 'heys'};
		this.getData = this.getData.bind(this); //making getData part of the state
	}
	getData(){
      let code = new URL(window.location.href).searchParams.get('code');
      console.log(this.props.fetchCode().payload,"lajdf")
      if(!code){
        this.props.fetchActivities();
      }else{
        this.props.fetchActivitiesWithCode();
      };
  	};
	
	componentDidMount() {this.getData(); }
	render() {
		if(!this.props.activities) {
			return(
				<div>Loading Activities ...</div>
			);
		}
		let year = (new Date()).getFullYear();
    	let month = 0; //january
    	let totalElevation = sumElevation(this.props.activities);
    	let lastYearsElevation = monthElevation(this.props.activities, new Date(year, month, -1).getTime())
		return (	
            <div id="activities_header">{`Total Climbed this Year:`}<span id="elevation_total"><br/>{`${(totalElevation - lastYearsElevation).toLocaleString()} ft`}</span></div>
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

//function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivities, fetchActivitiesWithCode}, dispatch); }
function mapDispatchToProps(dispatch){ return bindActionCreators({fetchActivities, fetchActivitiesWithCode, fetchCode}, dispatch); }
//connect is forming bridge between redux and react CONTAINERS are the bridge.  connect is a function
//now exporting the container instead of just the class Activities
export default connect(mapStateToProps, mapDispatchToProps)(Activities); 




