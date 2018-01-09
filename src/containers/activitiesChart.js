import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities } from '../actions/actions_index'; //importing activities axios data
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Chart from 'chart.js'; 
import {Line} from 'react-chartjs-2';

//SumElevation outsid eof the component
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
      let sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10); //convert to ft.
      return Number(sumActivities);
}

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
   /* let goalPerMonth = 42000; //to average 500,000 
    let dateYR = '17';
    let dateMonth = 1;
    ];*/
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'],
        datasets: [
          {
            label: 'Elevation Climbed',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#f36627',
            borderColor: '#f36627',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#e7e3e3', //dots on the line graph
            pointBackgroundColor: '#fE6627',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#e7e3e3',
            pointHoverBorderColor: '#e7e3e3',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              0, 
              monthElevation(this.props.activities,1485907200000),
              monthElevation(this.props.activities,1488326400000),
              monthElevation(this.props.activities,1491004800000),
              monthElevation(this.props.activities,1493596800000),
              monthElevation(this.props.activities,1496275200000),
              monthElevation(this.props.activities,1501545600000),
              monthElevation(this.props.activities,1504224000000),
              monthElevation(this.props.activities,1506816000000),
              monthElevation(this.props.activities,1509494400000),
              monthElevation(this.props.activities,1512086400000),
              monthElevation(this.props.activities,1514767458000)
              ]
          }
        ]
    };


    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = true;

    return (  
       <Line data={data} width="1000" height="400"/>
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

     /*   <ResponsiveContainer aspect={3.5/1}>
            <LineChart data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Line type="monotone" dataKey="climbed" stroke="#fe6627" activeDot={{r: 8}}/> 
           <Line type="monotone" dataKey="goal" stroke="#029Ae6" />
          </LineChart>
        </ResponsiveContainer>*/
