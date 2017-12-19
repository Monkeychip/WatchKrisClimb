import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities } from '../actions/index'; //importing activities axios data
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//SumElevation outsid eof the component
function sumElevation(allActivities) {
    let addActivities = (a,b) => a + b 
    let arrayElevationGain = [];
    allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
        let sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10); //convert to ft.
        return Number(sumActivities);
}

//const epochDates = [1493596800000,1496275200000,1496275200000,1501545600000,1504224000000,1506816000000,1509494400000,1512086400000] //feb,march,april,may,june,july,aug,sept,oct,nov,dec

function monthElevation(allActivities,timestamp) {
  let janActivities = allActivities.filter(
    function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate <  timestamp);  
    }
  )
  return sumElevation(janActivities); // now with correct array run through the Sum Elevation and return that value  
}

class ActivitiesChart extends Component {
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
    let goalPerMonth = 42000; //to average 500,000 
    const data = [
          {name: '1-01-18', goal: goalPerMonth, climbed: 10, amt: 2400},
          {name: '2-01-18', goal: goalPerMonth*2, climbed: monthElevation(this.props.activities,1485907200000), amt: 2210},
          {name: '3-01-18', goal: goalPerMonth*3, climbed: monthElevation(this.props.activities,1488326400000), amt: 2290},
          {name: '4-01-18', goal: goalPerMonth*4, climbed: monthElevation(this.props.activities,1491004800000), amt: 2000},
          {name: '5-01-18', goal: goalPerMonth*5, climbed: monthElevation(this.props.activities,1493596800000), amt: 2181},
          {name: '6-01-18', goal: goalPerMonth*6, climbed: monthElevation(this.props.activities,1496275200000), amt: 2500},
          {name: '7-01-18', goal: goalPerMonth*7, climbed: monthElevation(this.props.activities,1501545600000), amt: 2100},
          {name: '8-01-18', goal: goalPerMonth*8, climbed: monthElevation(this.props.activities,1504224000000), amt: 2100},
          {name: '9-01-18', goal: goalPerMonth*9, climbed: monthElevation(this.props.activities,1506816000000), amt: 2100},
          {name: '10-01-18', goal: goalPerMonth*10, climbed: monthElevation(this.props.activities,1509494400000), amt: 2100},
          {name: '11-01-18', goal: goalPerMonth*11, climbed: monthElevation(this.props.activities,1512086400000), amt: 2100},
          {name: '12-01-18', goal: goalPerMonth*12, climbed: monthElevation(this.props.activities,1514767458000), amt: 2100},
    ];

    return (  
          <LineChart width={1000} height={350} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="climbed" stroke="#fe6627" activeDot={{r: 8}}/> 
         <Line type="monotone" dataKey="goal" stroke="#029Ae6" />
        </LineChart>
        )
       
    }
}

function mapStateToProps({activities}){
  return {activities};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchActivities}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesChart);
