import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2';

import { fetchActivitiesWithCodeThisYear, fetchThisYear } from "../actions/actions_index";
import { store } from '../reduxStore';

function weekElevation(allData) {
	let lastSunday = moment().startOf('isoWeek').valueOf();
  let weekActivity = allData.filter(
   	function(value) {
      let activityDate = moment(new Date(String(value.start_date_local))).valueOf();
      return (activityDate > lastSunday);
    }
  )
  return sumElevation(weekActivity) // now with correct array run through the Sum Elevation and return that value
}

function sumElevation(weekActivity) {
  let addActivities = (a,b) => a + b;
  let arrayElevationGain = [];
  let sumActivities = 0;

  weekActivity.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain));

  if(arrayElevationGain.length > 0) {
     sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10) //to correct for meter conversion
   }  //TODO: should add an else here for error handling
  
  return Number(sumActivities);
}

class BarChartGoal extends Component {
  getActvitiesWeek() {
    let weekElevationGain = weekElevation(this.props.thisYear);
 		return weekElevationGain;	
  }

  componentDidMount() {
    let code = store.getState().code;
    let thisYearsActivities = store.getState().thisYearsActivities;

    if(!code) {
        !thisYearsActivities ? this.props.fetchThisYear() : thisYearsActivities
    } else {
        !thisYearsActivities ? this.props.fetchActivitiesWithCodeThisYear() : thisYearsActivities
    }
  }

  render() {
    if(!this.props.thisYear) {
      return (
         <div>Loading Activities ...</div>
      )
    } else {
      let goalTotal = Number(localStorage.getItem('goal'));
      let goal = Math.ceil(goalTotal / 52.1429);
      let weekTotal = this.getActvitiesWeek();
      let xAxisMax = Math.max(goal, weekTotal);
      localStorage.setItem('xAxisMax', xAxisMax);
      let stepSize = Math.ceil(xAxisMax / 5);
      let height = 100;
      const barOptions = {
        legend: {
           display: false
        },
        scales: {
          yAxes: [{
            barPercentage: 0.9,
            gridLines: {
              display: false,
            },
          }],
          xAxes: [{
            afterTickToLabelConversion: function (scaleInstance) {
              scaleInstance.ticks[0] = null;
              scaleInstance.ticksAsNumbers[0] = null;
            },
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              offset: true,
              tickMarkLength: true,
              stepSize: stepSize,
              min: 0,
              max: xAxisMax,
              maxTicksLimit: 5,
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
              if(t.datasetIndex === 0) {
                return `${t.xLabel.toLocaleString()} ft  `;
              } else {
                return `${t.xLabel.toLocaleString()} ft  `;
              }
            },
          }
        }
      }
      const data = {
        labels: ['This week', 'Goal'],
        datasets: [
          {
            backgroundColor: ['rgba(254,102,39,0.2)', 'rgba(255,187,40,0.3)'], //second color is Goal
            borderColor: ['rgba(254,102,39,1)', 'rgba(255,187,40,1)'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(254,102,39,0.4)', 'rgba(255,187,40,0.4)'],
            hoverBorderColor: ['rgba(254,102,39,1)', 'rgba(255,187,40,1)'],
            data: [weekTotal, goal]
          }
        ]
      };
      return (
        <div>
          <HorizontalBar data={data} options={barOptions} height={height}/>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
	return {
    thisYear: state.thisYearsActivities,
    goal: state.form
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchThisYear, fetchActivitiesWithCodeThisYear }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartGoal);
