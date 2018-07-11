import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

import Goal from "./goal";
import {
  fetchActivities,
  fetchActivitiesWithCode,
  fetchThisYear,
  fetchActivitiesWithCodeThisYear,
  fetchCode
} from "../actions/actions_index"; //importing activities axios data
import { sumElevationHelper, EndOfDecLastYear } from "../helperFunctions";
import { store } from "../reduxStore";

function monthElevation(monthData, timestamp) {
  let monthActivity = monthData.filter(function(value) {
    let epochDate = new Date(String(value.start_date_local)).getTime();
    return epochDate < timestamp;
  });
  return sumElevationHelper(monthActivity);
}

class ActivitiesChart extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this); //only place in app I'm calling the data.
    this.submit = this.submit.bind(this);
    this.state = {
      goal: 0
    };
  }

  /*Getting the submit data*/
  submit(values) {
    if (!values) {
      return;
    } else {
      //Set goal to local storage so that you can use it from barCharts.js
      localStorage.setItem("goal", values.number);
      this.setState({
        goal: values.number
      });
    }
  }

  getData() {
    let code = this.props.fetchCode();
    let thisYearsActivities = store.getState().thisYearsActivities;
    let lastYearsActivites = store.getState().activities;

    if (code.payload !== "no code") {
      //if no activities for either last or this year, then run the fetch, otherwise, do nothing
      !thisYearsActivities ? this.props.fetchActivitiesWithCodeThisYear() : "";
      !lastYearsActivites ? this.props.fetchActivitiesWithCode() : "";
    } else {
      !thisYearsActivities ? this.props.fetchThisYear() : "";
      !lastYearsActivites ? this.props.fetchActivities() : "";
    }
  }

  componentDidMount() {
    this.getData();
    this.setState({ goal: localStorage.getItem("goal") });
  }

  render() {
    if (!this.props.activitiesArray) {
      return <div>Loading Activities ...</div>;
    } else {
      //only render when you have activities
      /*Goal Projection*/
      let goalArray = [],
        g,
        monthGoal,
        goal;

      if (this.state.goal > 0) {
        goal = this.state.goal;
        monthGoal = goal / 12;
        for (g = 1; g < 13; g++) {
          goalArray.push(Math.ceil(monthGoal * g));
        }
      } else {
        goal = 0;
      }
      /*Time and Calendar Variables*/
      let monthData = this.props.activitiesArray || [0]; //for when empty return something
      let monthDataThisYear = this.props.thisYear || [0]; //for when empty return something
      let now = new Date();
      let todayEpochTime = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      ).getTime();
      let year = new Date().getFullYear();
      let dataArray = [];
      let dataArrayLastYear = [];
      let xaxisLabels = [];
      let lastYearsElevation = monthElevation(monthData, EndOfDecLastYear);
      /*Data Array maker this year*/
      let ind;
      for (ind = 1; ind <= 12; ind++) {
        let thisYearDate = new Date(year, ind, 0).getTime(); //2018
        if (todayEpochTime >= thisYearDate) {
          let data = Number(monthElevation(monthDataThisYear, thisYearDate));
          dataArray.push(data);
        } else {
          //do nothing
        }
      }
      //Data Array maker last year
      let i;
      for (i = 0; i <= 11; i++) {
        //jan 31,2017
        let lastYearDate = moment()
          .startOf("year")
          .subtract(1, "year")
          .add(i, "month")
          .endOf("month")
          .subtract(1, "day")
          .valueOf();
        if (EndOfDecLastYear >= lastYearDate) {
          dataArrayLastYear.push(monthElevation(monthData, lastYearDate));
        } else {
          dataArrayLastYear.push(0);
        }
      }
      /*HEIGHT OF YAXIS
      Determine the height of the yAxis based on the highest of the 3:
        1. last year's elevation total,
        2. this year's elevation total,
        3. goal you set
        Handle error by returning 10000 in case.
      */
      function yAxisMax() {
        let thisYearsMaxElevation = Math.max(...dataArray),
          yAxisOptionsArray = [thisYearsMaxElevation, lastYearsElevation, goal];
        if (Math.max(...yAxisOptionsArray) > 0) {
          return Math.max(...yAxisOptionsArray) * 1.05;
        } else {
          return 10000;
        }
      }
      yAxisMax();
      /*xaxis label array maker*/
      let z;
      let today = new Date();
      for (z = 0; z <= 12; z++) {
        //locate today's date between two months
        if (today > new Date(year, z, 0) && today < new Date(year, z + 1, 0)) {
          xaxisLabels.push(new Date(year, z, 0), today);
        } else {
          xaxisLabels.push(new Date(year, z, 0));
        }
      }
      const data = {
        labels: [
          new Date(year, 0, 0),
          new Date(year, 1, 0),
          new Date(year, 2, 0),
          new Date(year, 3, 0),
          new Date(year, 4, 0),
          new Date(year, 5, 0),
          new Date(year, 6, 0),
          new Date(year, 7, 0),
          new Date(year, 8, 0),
          new Date(year, 9, 0),
          new Date(year, 10, 0),
          new Date(year, 11, 0),
          new Date(year, 12, 0)
        ],
        datasets: [
          {
            label: "This Year",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#f36627",
            borderColor: "#f36627",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#e7e3e3", //dots on lines and within tooltip
            pointBackgroundColor: "#fE6627",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fE6627",
            pointHoverBorderColor: "#fE6627",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              { x: xaxisLabels[0], y: 0 }, //dec 31
              { x: xaxisLabels[1], y: dataArray[0] }, //
              { x: xaxisLabels[2], y: dataArray[1] }, //pushing today
              { x: xaxisLabels[3], y: dataArray[2] },
              { x: xaxisLabels[4], y: dataArray[3] },
              { x: xaxisLabels[5], y: dataArray[4] },
              { x: xaxisLabels[6], y: dataArray[5] },
              { x: xaxisLabels[7], y: dataArray[6] },
              { x: xaxisLabels[8], y: dataArray[7] },
              { x: xaxisLabels[9], y: dataArray[8] },
              { x: xaxisLabels[10], y: dataArray[9] },
              { x: xaxisLabels[11], y: dataArray[10] },
              { x: xaxisLabels[12], y: dataArray[11] }
            ]
          },
          {
            label: "Last Year",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(2,154,230,0.3)",
            borderColor: "rgba(2,154,230,0.3)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#e7e3e3", //dots on the line graph
            pointBackgroundColor: "rgba(2,154,230,0.3)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,154,230,0.3)",
            pointHoverBorderColor: "#e7e3e3",
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
            ]
          },
          {
            label: "Goal",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,187,40,.3)",
            borderColor: "rgba(255,187,40,.3)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#e7e3e3", //dots on the line graph
            pointBackgroundColor: "rgba(255,187,40,.3)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,187,40,.3)",
            pointHoverBorderColor: "#e7e3e3",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              0,
              goalArray[0],
              goalArray[1],
              goalArray[2],
              goalArray[3],
              goalArray[4],
              goalArray[5],
              goalArray[6],
              goalArray[7],
              goalArray[8],
              goalArray[9],
              goalArray[10],
              goalArray[11]
            ]
          }
        ]
      };
      const chartOptionsActvitiies = {
        repsonsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Accumlated Elevation Climbed by Month"
        },

        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#888590"
          }
        },

        scales: {
          yAxes: [
            {
              afterTickToLabelConversion: function(scaleInstance) {
                scaleInstance.ticks[0] = null;
                scaleInstance.ticksAsNumbers[0] = null;
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                offset: true,
                tickMarkLength: true,
                min: 0,
                max: yAxisMax(),
                callback: value => `${value.toLocaleString()} ft`
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ]
        },

        tooltips: {
          mode: "index",
          xPadding: 10,
          yPadding: 10,
          bodyFontSize: 13,
          bodyFontColor: "#888590",
          backgroundColor: "#e7e3e3",
          titleFontSize: 14,
          titleFontColor: "#888590",

          callbacks: {
            label: function(t, d) {
              if (t.datasetIndex === 0) {
                return `${t.yLabel.toLocaleString()} ft  `;
              } else {
                return `${t.yLabel.toLocaleString()} ft  `;
              }
            },
            title: function(tooltipItem, data) {
              return `${moment(tooltipItem[0].xLabel).format("MMM")}`;
            },
            labelTextColor: function(tooltipItem, chart) {
              return "#888590";
            }
          }
        }
      };
      /*TODO Place these settings somewhere else, they're global*/
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.labels.usePointStyle = true; //legend into circle
      let width = 1000,
        height = 300;
      return (
        <div id="dumb">
          <Line
            data={data}
            options={chartOptionsActvitiies}
            width={width}
            height={height}
          />
          <Goal onSubmit={this.submit} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    activitiesArray: state.activities,
    form: state.form,
    thisYear: state.thisYearsActivities,
    code: state.code
  }; //adding form here connects the form props to this components state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchActivities,
      fetchActivitiesWithCode,
      fetchThisYear,
      fetchActivitiesWithCodeThisYear,
      fetchCode
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesChart);
