import React, { Component } from "react";
import { connect } from "react-redux";

function sumElevation(allActivities) {
  let addActivities = (a, b) => a + b;
  let arrayElevationGain = [];

  allActivities.forEach(activity =>
    arrayElevationGain.push(activity.total_elevation_gain)
  );

  let sumActivities = 0;

  if (arrayElevationGain.length > 0) {
    sumActivities = parseInt(
      arrayElevationGain.reduce(addActivities) / 0.3048,
      10
    );
  }

  return sumActivities;
}

export class Activities extends Component {
  render() {
    if (!this.props.thisYear) {
      return <div>Loading Activities ...</div>;
    }
    return (
      <div id="activities_header">
        {`Total Climbed this Year:`}
        <span id="elevation_total">
          <br />
          {`${sumElevation(this.props.thisYear).toLocaleString()} ft`}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    thisYear: state.thisYearsActivities
  };
}

export default connect(mapStateToProps)(Activities);
