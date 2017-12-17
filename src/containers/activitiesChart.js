//using recharts.js build a height and zoom line chart to display elevation gain
import React, {Component} from 'react';
import {connect} from 'react-redux'; //imported but some warnings
import {bindActionCreators} from 'redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//import ActivitiesJan from './janActivities';

let goalPerMonth = 42000; //to average 500,000 
 const data = [
      {name: '1-01-18', goal: goalPerMonth, climbed: 10, amt: 2400},
      {name: '2-01-18', goal: goalPerMonth*2, climbed: 1398, amt: 2210},
      {name: '3-01-18', goal: goalPerMonth*3, climbed: 9800, amt: 2290},
      {name: '4-01-18', goal: goalPerMonth*4, climbed: 3908, amt: 2000},
      {name: '5-01-18', goal: goalPerMonth*5, climbed: 4800, amt: 2181},
      {name: '6-01-18', goal: goalPerMonth*6, climbed: 3800, amt: 2500},
      {name: '7-01-18', goal: goalPerMonth*7, climbed: 4300, amt: 2100},
      {name: '8-01-18', goal: goalPerMonth*8, climbed: 4300, amt: 2100},
      {name: '9-01-18', goal: goalPerMonth*9, climbed: 4300, amt: 2100},
      {name: '10-01-18', goal: goalPerMonth*10, climbed: 4300, amt: 2100},
      {name: '11-01-18', goal: goalPerMonth*11, climbed: 4300, amt: 2100},
      {name: '12-01-18', goal: goalPerMonth*12, climbed: 4300, amt: 2100},
];


export default class ActivitiesChart extends React.Component {
    render () {
	  	return (
	    	<LineChart width={1000} height={500} data={data}
	            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
	       <XAxis dataKey="name"/>
	       <YAxis/>
	       
	       <Tooltip/>
	       <Legend />
	       <Line type="monotone" dataKey="climbed" stroke="#fe6627" activeDot={{r: 8}}/>
	       <Line type="monotone" dataKey="goal" stroke="#029Ae6" />
	      </LineChart>
	    );
  }
};

/*
import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivitiesJan } from '../actions/index';

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
