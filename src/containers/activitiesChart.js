import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index'; //importing activities axios data
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Chart from 'chart.js'; 
import {Line} from 'react-chartjs-2';

//SumElevation outside of the component
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
  let sumActivities = 0;
  if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10)}  
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
    //this.props.fetchActivities();
      let code = new URL(window.location.href).searchParams.get('code')
      if(!code){
        this.props.fetchActivities();
      }else{
        this.props.fetchActivitiesWithCode();
      };
  }
 
  componentDidMount() {this.getData(); }
  render() {
    if(!this.props.activities) {
      return(
        <div>Loading Activities ...</div>
      );
    }
    let todayEpochTime = (new Date).getTime();
    const calendarEpochTime = [new Date('2018-01-01').getTime(),new Date('2018-02-01').getTime(),new Date('2018-03-01').getTime(),new Date('2018-04-01').getTime(),new Date('2018-05-01').getTime(),new Date('2018-06-01').getTime(),new Date('2018-07-01').getTime(),new Date('2018-08-01').getTime(),new Date('2018-09-01').getTime(),new Date('2018-10-01').getTime(),new Date('2018-11-01').getTime(),new Date('2018-12-01').getTime() ];
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
              monthElevation(this.props.activities,1517468400000),
              ()=> {if(todayEpochTime > calendarEpochTime[1]){monthElevation(this.props.activities,calendarEpochTime[1])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[2]){monthElevation(this.props.activities,calendarEpochTime[2])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[3]){monthElevation(this.props.activities,calendarEpochTime[3])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[4]){monthElevation(this.props.activities,calendarEpochTime[4])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[5]){monthElevation(this.props.activities,calendarEpochTime[5])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[6]){monthElevation(this.props.activities,calendarEpochTime[6])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[7]){monthElevation(this.props.activities,calendarEpochTime[7])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[8]){monthElevation(this.props.activities,calendarEpochTime[8])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[9]){monthElevation(this.props.activities,calendarEpochTime[9])}else{0}},
              ()=> {if(todayEpochTime > calendarEpochTime[10]){monthElevation(this.props.activities,calendarEpochTime[10])}else{0}}
              ]
          }
        ]
    };
    var chartOptions = {
            title: {
                display: true,
                text: 'Accumlated Elevation Climbed by Month'
            },

            legend: {
                display: false,
            },

            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true,
                  min: 0,
                  max: monthElevation(this.props.activities,1543647600000) * 3
                }
              }]
            }
        }

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = true;

    return (  
       <Line data={data} options={chartOptions} width="1000" height="400"/>
      )
       
    }
}

function mapStateToProps({activities}){
  return {activities};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchActivities, fetchActivitiesWithCode}, dispatch);
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
