import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index';
import Moment from 'moment';
import Chart from 'chart.js';
import { HorizontalBar } from 'react-chartjs-2'; 
import Goal from './goal';
import { persistor, store } from '../reduxStore';

/*BAR CHART 1*/
export class BarChartGoal extends Component {
	/*
	1. when this is loaded, set the state of Goal via the constructor function.
	2. when it's initially loaded, you set the goal to 0.
	*/

  constructor(props){
  	super(props);
  	this.getGoal = this.getGoal.bind(this); //binding the getGoal function to this.
  	this.state = { goal: 0}; 
  }

  getGoal(){
  	console.log(this.state,"maybe this will return the goal?");
  	/*
	get goal from local storage
	setup a if no goal situation
	redefine the goal state object to goal using this.setState
  	*/
  }

  componentDidMount(){
  	this.getGoal();
  }


  render() {
  	const data = {
	  labels: ['This week', 'Goal'],
	  datasets: [
	    {
	      backgroundColor: ['rgba(254,102,39,0.2)','rgba(255,187,40,0.3)'], //second color is Goal
	      borderColor: ['rgba(254,102,39,1)','rgba(255,187,40,1)'],
	      borderWidth: 1,
	      hoverBackgroundColor: ['rgba(254,102,39,0.4)', 'rgba(255,187,40,0.4)'],
	      hoverBorderColor: ['rgba(254,102,39,1)','rgba(255,187,40,1)'],
	      data: [65, 59]
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
    };

    return (
      <div>
      	
      	<HorizontalBar data={data} options={barOptions} height="100px"/>
      </div>
    );
  }

}

/*BAR CHART 2*/
export class BarChartSki extends Component {
	

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

/*BAR CHART 3*/
export class BarChartRun extends Component {

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
 export class BarChartElse extends Component {	

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



 