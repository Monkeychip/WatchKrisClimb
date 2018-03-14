import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data
import { sumElevationHelper, filterElevationDataHelper } from '../helperFunctions';


class BarChartBike extends Component {

  constructor(props){
    super(props);
  }

  getBikeActvitiesWeek(){
    let lastSunday = moment().startOf('isoWeek').valueOf(); 
    let filteredData = filterElevationDataHelper(this.props.activitiesArray, lastSunday, "Bike");
    let weekBikeElevationGain = sumElevationHelper(filteredData);
    return weekBikeElevationGain; 
  }
	

  render() {

    if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    let weekBikeTotal = this.getBikeActvitiesWeek();
    let xAxisMax = Number(localStorage.getItem('xAxisMax'));
    
  	const data = {
	  labels: ['Bike'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [weekBikeTotal]
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
                  max: xAxisMax,
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
      	
      	<HorizontalBar data={data} options={barOptions} height="50px"/>
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
    activitiesArray: state.activities 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartBike);


