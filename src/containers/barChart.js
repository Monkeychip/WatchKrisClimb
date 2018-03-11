import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index';
import Moment from 'moment';
import Chart from 'chart.js';
import { HorizontalBar } from 'react-chartjs-2'; 

export class BarChartGoal extends Component {

  render() {
  	const data = {
	  labels: ['This week', 'Goal'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(255,99,132,0.2)',
	      borderColor: 'rgba(255,99,132,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
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


export class BarChartSki extends Component {
	

  render() {
  	const data = {
	  labels: ['Ski'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(255,99,132,0.2)',
	      borderColor: 'rgba(255,99,132,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
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
	      backgroundColor: 'rgba(255,99,132,0.2)',
	      borderColor: 'rgba(255,99,132,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
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

      export class BarChartRun extends Component {
	

  render() {
  	const data = {
	  labels: ['Run'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(255,99,132,0.2)',
	      borderColor: 'rgba(255,99,132,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
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

 export class BarChartElse extends Component {
	

  render() {
  	const data = {
	  labels: ['Else'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(255,99,132,0.2)',
	      borderColor: 'rgba(255,99,132,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
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



 