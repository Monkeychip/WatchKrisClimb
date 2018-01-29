import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index'; //importing activities axios data
import Chart from 'chart.js'; 
import {Line} from 'react-chartjs-2';

//Sums Elevations via a reduce and forEach method.  Takes in data object from Month Elevation.
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
  let sumActivities = 0;
  if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10)}  
  return Number(sumActivities);
}

//Takes in the full object of activities data and sends to sumElevation only those dates relevant per the second parameter, timestamp
function monthElevation(monthData,timestamp) {
    
     let monthActivity = monthData.filter( 
     function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate <  timestamp);  
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
    
    //Time and Calendar Variables
    let monthData = this.props.activities; //activities data
    let now = new Date();
    let todayEpochTime = (new Date(now.getFullYear(), now.getMonth() + 1, 1)).getTime();
    
    //create calendar Arrays
    let calendarEpochTime = [];
    let calendarEpochTimeLastYear = [];
    let year = (new Date()).getFullYear();
    let dataArray = [];
    let dataArrayLastYear = [];
    let lastYearsElevation = monthElevation(this.props.activities, new Date(year, 0, -1).getTime());

    //Data Array maker this year
    for(var i = 1; i <= 12; i++){
      let thisYearDate = new Date(year,i,0).getTime(); //2018     
      if (todayEpochTime >= thisYearDate){
        let data = new Number(monthElevation(monthData,thisYearDate) - lastYearsElevation);
        let dataAsNumber = data.toLocaleString();
        dataArray.push(data);
      }else{

      }
    } 

    //Data Array maker last year
    for(var i = 1; i <=12; i++){
      let lastDayOfLastYear = (new Date(year,0,0)).getTime(); 
      let lastYearDate = new Date(year-1,i,0).getTime(); 
      if(lastDayOfLastYear >= lastYearDate){
        dataArrayLastYear.push(monthElevation(monthData,lastYearDate));
      }else{dataArrayLastYear.push(0)}
    }
    
      
    //find max for y axis
    function yAxisMax(){
      let totalElevationLastYear = monthElevation(monthData, new Date(year-1,12,0).getTime());
      if(dataArrayLastYear[11] > totalElevationLastYear ){
        return dataArrayLastYear[11]
      }else if(dataArrayLastYear[11] <= totalElevationLastYear ){
        return totalElevationLastYear * 1.05; //return 5 higher in height%
      }else{
        return 100000;
      }
    }

    yAxisMax();

    const data = {
        labels: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'],
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
            pointBorderColor: '#e7e3e3', //dots on lines and within tooltip
            pointBackgroundColor: '#fE6627',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fE6627',
            pointHoverBorderColor: '#fE6627',
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
              dataArray[10],
              dataArray[11]
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
            pointBackgroundColor: '#029Ae6',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#029Ae6',
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
              dataArrayLastYear[10],
              dataArrayLastYear[11]
              ],
          }
        ]
    };
    const chartOptions = {
            repsonsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Accumlated Elevation Climbed by Month'
            },

            legend: {
                display: true,
                position: 'bottom',
                labels: {
                  fontColor: '#888590'
                }
            },

            scales: {
              yAxes: [{
                afterTickToLabelConversion: function(scaleInstance){
                  //set the last tick to null so it does not display
                  //tick[0] is the last tick
                  scaleInstance.ticks[0] = null;
                  scaleInstance.ticksAsNumbers[0] = null;
                },
                ticks: {
                  beginAtZero:true,
                  autoSkip:true,
                  offset: true,
                  tickMarkLength: true,
                  min: 0,
                  max: yAxisMax(),
                  callback: value => `${value.toLocaleString()} ft`
                }
              }]
            },

            tooltips: {
              mode: 'index',
              xPadding: 10,
              yPadding: 10,
              bodyFontSize: 13,
              bodyFontColor: '#888590',
              backgroundColor: '#e7e3e3',
              titleFontSize: 14,
              titleFontColor: '#888590',

              callbacks: {
                //label: function(tooltipItem, data) {
                 // return `  ${tooltipItem.yLabel.toLocaleString()} ft  `;

                  label: function (t, d) {
                    if (t.datasetIndex === 0) {
                      return `${t.yLabel.toLocaleString()} ft  `;
                    } else { 
                      return `${t.yLabel.toLocaleString()} ft  `;
                    }
                  
                },
                title: function(tooltipItem, data) {
                   return tooltipItem[0].xLabel;
                },
                labelTextColor:function(tooltipItem, chart){
                    return '#888590';
                },
             },
           },
            
        }
/*TODO Place these settings somewhere else, they're global*/
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.legend.labels.usePointStyle = true; //legend into circle
   

    return (  
       <Line data={data} options={chartOptions} width="1000" height="300"/>
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

     