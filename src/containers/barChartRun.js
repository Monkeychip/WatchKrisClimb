import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2'; 
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data
import { sumElevationHelper, filterElevationDataHelper } from '../helperFunctions';


class BarChartRun extends Component {


  getRunActvitiesWeek(){
    let lastSunday = moment().startOf('isoWeek').valueOf(); 
    let filteredData = filterElevationDataHelper(this.props.activitiesArray, lastSunday, "Run");
    let weekRunElevationGain = sumElevationHelper(filteredData);
    return weekRunElevationGain; 
  }
	

  render() {

  	if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    let weekRunTotal = this.getRunActvitiesWeek();
    let xAxisMax = Number(localStorage.getItem('xAxisMax'));
    let stepSize = Math.ceil(xAxisMax / 5);
    
  	const data = {
	  labels: ['Run'],
	  datasets: [
	    {
	      backgroundColor: 'rgba(2,154,230,0.2)',
	      borderColor: 'rgba(2,154,230,1)',
	      borderWidth: 1,
	      hoverBackgroundColor: 'rgba(2,154,230,0.4)',
	      hoverBorderColor: 'rgba(2,154,230,1)',
	      data: [weekRunTotal]
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
                  maxTicksLimit: 5,
                  stepSize: stepSize,
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

function mapStateToProps(state){

  return {
    activitiesArray: state.activities 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartRun);
