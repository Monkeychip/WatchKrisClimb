import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { HorizontalBar } from "react-chartjs-2";

import {
  sumElevationHelper,
  filterElevationDataHelper
} from "../helperFunctions";

class BarChartSki extends Component {
  getSkiActvitiesWeek() {
    let lastSunday = moment()
      .startOf("isoWeek")
      .valueOf();
    let filteredData = filterElevationDataHelper(
      this.props.thisYear,
      lastSunday,
      "BackcountrySki"
    );
    let weekSkiElevationGain = sumElevationHelper(filteredData);
    return weekSkiElevationGain;
  }

  render() {
    if (!this.props.thisYear) {
      return <div>...</div>;
    }
    let weekSkiTotal = this.getSkiActvitiesWeek();
    const data = {
      labels: ["Ski"],
      datasets: [
        {
          backgroundColor: "rgba(2,154,230,0.2)",
          borderColor: "rgba(2,154,230,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(2,154,230,0.4)",
          hoverBorderColor: "rgba(2,154,230,1)",
          data: [weekSkiTotal]
        }
      ]
    };
    let xAxisMax = Number(localStorage.getItem("xAxisMax"));
    let stepSize = Math.ceil(xAxisMax / 5);
    let height = 50;
    const barOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            barPercentage: 0.9,
            gridLines: {
              display: false
            }
          }
        ],
        xAxes: [
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
              max: xAxisMax,
              stepSize: stepSize,
              maxTicksLimit: 5,
              callback: value => `${value.toLocaleString()} ft`
            }
          }
        ]
      },
      tooltips: {
        position: "myCustomPosition",
        mode: "index",
        xPadding: 10,
        yPadding: 10,
        callbacks: {
          label: function(t) {
            if (t.datasetIndex === 0) {
              return `${t.xLabel.toLocaleString()} ft  `;
            } else {
              return `${t.xLabel.toLocaleString()} ft  `;
            }
          }
        }
      }
    };
    return (
      <div>
        <HorizontalBar data={data} options={barOptions} height={height} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    thisYear: state.thisYearsActivities
  };
}

export default connect(mapStateToProps)(BarChartSki);
