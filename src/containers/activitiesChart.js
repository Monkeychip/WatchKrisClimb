import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index'; //importing activities axios data
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

function monthElevation(monthData,timestamp) {
    
     let monthActivity = monthData.filter( //added data to widdle down
     function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate <  timestamp);  //today < 2017
    }
  )
    
  return sumElevation(monthActivity); // now with correct array run through the Sum Elevation and return that value  
}


class ActivitiesChart extends Component {
  constructor(props) { 
    super(props) 
    this.state = {term: 'heys'};
    this.getData = this.getData.bind(this);
  }
  getData(){
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
    
    let monthData = this.props.activities;
    let now = new Date();
    let year = (new Date()).getFullYear();
    let todayEpochTime = (new Date(now.getFullYear(), now.getMonth() + 1, 1)).getTime();
    let lastDayOfLastYear = (new Date(year,0,0)).getTime();
    let month = 1; //january
    let calendarEpochTime = [new Date(year, month,0).getTime(),new Date(year, month+1,0).getTime(),new Date(year, month+2,0).getTime(),new Date(year, month+3,0).getTime(),new Date(year, month+4,0).getTime(),new Date(year, month+5,0).getTime(),new Date(year, month+6,0).getTime(),new Date(year, month+7,0).getTime(),new Date(year, month+8,0).getTime(),new Date(year, month+9,0).getTime(),new Date(year, month+10,0).getTime(),new Date(year, month+11,0).getTime() ];
    let calendarEpochTimeLastYear = [new Date(year-1, month,0).getTime(),new Date(year-1, month+1,0).getTime(),new Date(year-1, month+2,0).getTime(),new Date(year-1, month+3,0).getTime(),new Date(year-1, month+4,0).getTime(),new Date(year-1, month+5,0).getTime(),new Date(year-1, month+6,0).getTime(),new Date(year-1, month+7,0).getTime(),new Date(year-1, month+8,0).getTime(),new Date(year-1, month+9,0).getTime(),new Date(year-1, month+10,0).getTime(),new Date(year-1, month+11,0).getTime() ];
    let lastYearsElevation = monthElevation(this.props.activities, new Date(year, 0, -1).getTime());
    
    //Calculate this years data per month in function 
    let dataArray = [];
    calendarEpochTime.forEach(function (time){
      if(todayEpochTime > time){
        dataArray.push(monthElevation(monthData,time) - lastYearsElevation);
      }
    });
    //Calculate last years data per month in function
    let dataArrayLastYear = [];
    calendarEpochTimeLastYear.forEach(function (time){
      if(lastDayOfLastYear > time){  //1485932400000 > 1488265200000
        dataArrayLastYear.push(monthElevation(monthData,time));
      }else{dataArrayLastYear.push(10)}
    });
    console.log(dataArrayLastYear,"dataArrayLastYear");
  
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'],
        datasets: [
          {
            label: 'This Year',
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
              dataArray[0],
              dataArray[1],
              dataArray[2],
              dataArray[3],
              dataArray[4],
              dataArray[5],
              dataArray[6],
              dataArray[7],
              dataArray[8],
              dataArray[9],
              dataArray[10]
              ],
          },
          {
            label: 'Last Year',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#029Ae6',
            borderColor: '#029Ae6',
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
              dataArrayLastYear[0],
              dataArrayLastYear[1],
              dataArrayLastYear[2],
              dataArrayLastYear[3],
              dataArrayLastYear[4],
              dataArrayLastYear[5],
              dataArrayLastYear[6],
              dataArrayLastYear[7],
              dataArrayLastYear[8],
              dataArrayLastYear[9],
              dataArrayLastYear[10]
              ],
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
                  max: 300000
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

     