import React from 'react';
import moment from 'moment';


//Filter activity data based on date
export function filterElevationDataHelper(allData, filterAfterDate, filteredActivity) {
  //let now = new Date();
  //let today = moment(new Date()).valueOf(); //1520976377824
      
  let filteredActivitiesByDate = allData.filter(      
      function(value){
          let activityDate = moment(new Date(String(value.start_date_local))).valueOf();
          return (activityDate > filterAfterDate);  
      }
    )
  
  	if(typeof filteredActivity === "undefined"){
    		return filteredActivitiesByDate;
  		//you just want to jump and return filteredActivitiesByDate
  	}else if(filteredActivity === "else"){
  		
  		let allOtherActivitiesFiltered = filteredActivitiesByDate.filter(
    		function(value){
      			let activityType = value.type;
      			return activityType ==!('BackcountrySki' || 'Run' || 'Bike');
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
   }  //TODO: should add an else here for error handling
  
  return Number(sumActivities);
}