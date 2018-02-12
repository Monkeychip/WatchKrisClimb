import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index'; //importing activities axios data
import Chart from 'chart.js'; 
import { Line } from 'react-chartjs-2';
import Moment from 'moment';

//Sums Elevations via a reduce and forEach method.  Takes in data object from Month Elevation.
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  let sumActivities = 0;

  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
  
  if(arrayElevationGain.length > 0){
     sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10)
   }  //TODO: should add an else here for error handling
  
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
    super(props); //parent method on Component 
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

  componentDidMount() {
    this.getData(); 
  }
  
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
    let year = (new Date()).getFullYear();
    let dataArray = [];
    let dataArrayLastYear = [];
    let xaxisLabels = [];
    let lastYearsElevation = monthElevation(this.props.activities, new Date(year, 0, -1).getTime());

    //Data Array maker this year
    let ind ; 
    for(ind = 1; ind <= 12; ind++){
      let thisYearDate = new Date(year,ind,0).getTime(); //2018     
      if (todayEpochTime >= thisYearDate){
        let data = new Number(monthElevation(monthData,thisYearDate) - lastYearsElevation);
        dataArray.push(data);
      }else{

      }
    } 
    
    //Data Array maker last year
    let i ;
    for(i = 1; i <=12; i++){
      let lastDayOfLastYear = (new Date(year,0,0)).getTime(); 
      let lastYearDate = new Date(year-1,i,0).getTime(); 
      if(lastDayOfLastYear >= lastYearDate){
        dataArrayLastYear.push(monthElevation(monthData,lastYearDate));
      }else{dataArrayLastYear.push(0)}
    }
    
    //xaxis label array maker


      
    //find max for y axis
    //TODO: situation where last year is greater than this year - confirm this works.
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

    //xaxis label array maker
    let z;
    let today = new Date();
    for (z =0; z<=12; z++){
      
      //locate today's date between two months
      if( today > new Date(year,z,0) && today < new Date(year,z+1,0)){
        xaxisLabels.push(new Date(year,z,0),today); //need to push both so that it doesn't fall out of order TODO see if works for March
      }else{
      xaxisLabels.push(new Date(year,z,0));
      }
    }   


    const data = {
        labels: [new Date(year,0,0),new Date(year,1,0), new Date(year,2,0), new Date(year,3,0),new Date(year,4,0),new Date(year,5,0),new Date(year,6,0),new Date(year,7,0),new Date(year,8,0),new Date(year,9,0),new Date(year,10,0),new Date(year,11,0),new Date(year,12,0)],
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
              {x: xaxisLabels[0], y: 0}, //dec 31
              {x: xaxisLabels[1], y: dataArray[0]}, // 
              {x: xaxisLabels[2], y: dataArray[1]}, //pushing today
              {x: xaxisLabels[3], y:dataArray[2]},
              {x: xaxisLabels[4], y:dataArray[3]},
              {x: xaxisLabels[5], y:dataArray[4]},
              {x: xaxisLabels[6], y:dataArray[5]},
              {x: xaxisLabels[7], y:dataArray[6]},
              {x: xaxisLabels[8], y:dataArray[7]},
              {x: xaxisLabels[9], y:dataArray[8]},
              {x: xaxisLabels[10], y:dataArray[9]},
              {x: xaxisLabels[11], y:dataArray[10]},
              {x: xaxisLabels[12], y:dataArray[11]}
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
              }],
              xAxes: [{
                    type: "time",
                    display: true,
                    scaleLabel: {
                      display:true,
                      labelString: 'Date'
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
                  label: function (t, d) {
                    if (t.datasetIndex === 0) {
                      return `${t.yLabel.toLocaleString()} ft  `;
                    } else { 
                      return `${t.yLabel.toLocaleString()} ft  `;
                    }
                  
                },
                title: function(tooltipItem, data) {
                   return `${Moment(tooltipItem[0].xLabel).format('MMM')}`;
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

     