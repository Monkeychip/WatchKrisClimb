import moment from 'moment';
import { Chart } from 'react-chartjs-2'; 

export const janFirstLastYear = (moment().startOf('year').subtract(1,'year').valueOf())/1000;
export const EndOfDecLastYear = moment().startOf('year').subtract(1,'day').valueOf();
export const janFirstThisYear = (moment().startOf('year').valueOf())/1000;

//Filter activity data based on date
export function filterElevationDataHelper(allData, filterAfterDate, filteredActivity) {

  let filteredActivitiesByDate = allData.filter(      
      function(value){
          let activityDate = moment(new Date(String(value.start_date_local))).valueOf();
          return (activityDate > filterAfterDate);
      }
    )
  	if(typeof filteredActivity === "undefined"){
    		return filteredActivitiesByDate;
  	}else if(filteredActivity === "else"){
  		let allOtherActivitiesFiltered = filteredActivitiesByDate.filter(
    		function(value){
      			let activityType = value.type;
      			if(('BackcountrySki Run Ride').indexOf(activityType) < 0){
      			  return activityType}
      			else{
      			  //do nothing
            }
    		}
  		)
  		return allOtherActivitiesFiltered;
  	}else{
  		let specificActivityFiltered = filteredActivitiesByDate.filter(
    		function(value){
      			let activityType = value.type;
      			return activityType === filteredActivity;
    		}
  		)
  		return specificActivityFiltered;
  	}
}

//Summation Function only on value total_elevation_gain
export function sumElevationHelper(activityArray) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  let sumActivities = 0;

  activityArray.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain));
  
  if(arrayElevationGain.length > 0){
     sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) //to correct for meter conversion
   }else{
      //do nothing
  }
  
  return Number(sumActivities);
}

//Horizontal Bar Options
Chart.Tooltip.positioners.myCustomPosition = function(unused, position) { //TODO: remove unused parameters
   return { x: 160, y: -10 };
}
let xAxisMax = Number(localStorage.getItem('xAxisMax'));
export const barOptions = {
      legend: {
          display: false
    },
    scales: {
          yAxes: [{

                barPercentage: 0.9,
                gridLines: {
                  display:false,
              },
              
            }],
            xAxes: [{
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
                  max: xAxisMax,
                  callback: value => `${value.toLocaleString()} ft`
                }
            }]
      },
      tooltips: {
              position: 'myCustomPosition',
              mode: 'index',
              xPadding: 10,
              yPadding: 10,
              callbacks: {
                  label: function (t, d) {
                    if (t.datasetIndex === 0) {
                      return `${t.xLabel.toLocaleString()} ft  `;
                    } else { 
                      return `${t.xLabel.toLocaleString()} ft  `;
                    }
                  },

	        } 
    }
 }

