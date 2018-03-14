import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data


//Takes in the full object of activities data and sends to sumElevation only those dates relevant per the second parameter, timestamp
function weekElevation(allData) {
	let now = new Date();
	let today = moment(new Date()).valueOf(); //1520976377824
	let lastSunday = moment().startOf('week').valueOf(); //1520751600000  1520772096000
    
    let weekActivity = allData.filter( 
    	
    	function(value){
    		
      		let activityDate = moment(new Date(String(value.start_date_local))).valueOf();
      		return (activityDate > lastSunday);  
    	}
  	)
    console.log(weekActivity,"weekActivity, only activities for the week");
  return sumElevation(weekActivity); // now with correct array run through the Sum Elevation and return that value  */
}

//Sums Elevations via a reduce and forEach method.  Takes in data object from Month Elevation.
function sumElevation(weekActivity) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  let sumActivities = 0;

  weekActivity.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain));
  
  if(arrayElevationGain.length > 0){
     sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) //to correct for meter conversion
   }  //TODO: should add an else here for error handling
  
  return Number(sumActivities);
}



/*BAR CHART 1*/
class BarChartGoal extends Component {

  constructor(props){
  	super(props);
  }

  getActvitiesWeek(){
  		let weekElevationGain = weekElevation(this.props.activitiesArray); 
 		return weekElevationGain;	
  }
  
  render() {
  	if(!this.props.activitiesArray){
  		
  		this.props.fetchActivities();
  		
  		return(
        	<div>Loading Activities ...</div>
      	);
  		
  	}
    let goalTotal = localStorage.getItem('goal') ? localStorage.getItem('goal') : 0 ;
    let goal = Math.ceil(goalTotal / 52.1429);
    //call the sumation calculator
    let weekTotal = this.getActvitiesWeek();


  	const data = {
	  labels: ['This week', 'Goal'],
	  datasets: [
	    {
	      backgroundColor: ['rgba(254,102,39,0.2)','rgba(255,187,40,0.3)'], //second color is Goal
	      borderColor: ['rgba(254,102,39,1)','rgba(255,187,40,1)'],
	      borderWidth: 1,
	      hoverBackgroundColor: ['rgba(254,102,39,0.4)', 'rgba(255,187,40,0.4)'],
	      hoverBorderColor: ['rgba(254,102,39,1)','rgba(255,187,40,1)'],
	      data: [weekTotal, goal]
	    }
	  ]
	};

	const barOptions = {
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
                  max: 10000,
                  callback: value => `${value.toLocaleString()} ft`
                }
            }]
    	},
    	tooltips: {
              mode: 'index',
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

    return (
      <div>
      	<HorizontalBar data={data} options={barOptions} height="100px"/>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchActivities } , dispatch)
}

/* CONNNECTING TO APPLICATION STATE*/
function mapStateToProps(state){

	return {
		activitiesArray: state.activities // this.props.activitiesArray now accessible in the component.
		//whatever container here is === this.props of component asdf: 123 this.props.asdf == 123
		//see the reducer key for getting activiites name
	}
}
//connect function says take component, and return container
export default connect(mapStateToProps, mapDispatchToProps)(BarChartGoal);


/*BAR CHART 2*/
/*export class BarChartSki extends Component {
	

  render() {
  	const data = {
	  labels: ['Ski'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [65]
	    }
	  ]
	};

	const barOptions = {
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
            	ticks: {beginAtZero:true, max: 100},


            }]
    	}
    }
   return (
      <div>
      	
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
      </div>
    );
  }

}

  export class BarChartBike extends Component {
	

  render() {
  	const data = {
	  labels: ['Bike'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [14]
	    }
	  ]
	};

	const barOptions = {
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
            	ticks: {beginAtZero:true, max: 100},


            }]
    	}
    }

    return (
      <div>
      	
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
      </div>
    );
  }

}
*/
/*BAR CHART 3*/
/*export class BarChartRun extends Component {

  render() {
  	const data = {
	  labels: ['Run'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [69]
	    }
	  ]
	};

	const barOptions = {
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
            	ticks: {beginAtZero:true, max: 100},


            }]
    	}
    }
        return (
      <div>
      	
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
      </div>
    );
  }

}

/*BAR CHART 4*/
 /*export class BarChartElse extends Component {	

  render() {
  	const data = {
	  labels: ['Else'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [5]
	    }
	  ]
	};

	const barOptions = {
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
            	ticks: {beginAtZero:true, max: 100},

            }]
    	}
    }


    return (
      <div>
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
      </div>
    );
  }

}


*/
 