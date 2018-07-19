import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import { fetchActivities } from "../actions/actions_index";

function createDaysArray(allData, startFilter, endFilter) {
  //TODO put into helper function
  let filteredActivitiesbyAugust = allData.filter(function(value) {
    let activityDate = moment(
      new Date(String(value.start_date_local))
    ).valueOf();
    return activityDate > startFilter && activityDate < endFilter;
  });
  //TODO filter and return count might be easier way with object.keys
  let dataObject = {
    daysSkied: 0,
    daysRun: 0,
    daysBiked: 0,
    daysElse: 0
  };
  for (let [type, value] of Object.entries(filteredActivitiesbyAugust)) {
    if (value.type === "BackcountrySki") {
      ++dataObject.daysSkied;
    }
  }
  return dataObject;
}

class DaysSkied extends Component {
  getDaysArray() {
    let thisYearAugust = moment()
      .date(0)
      .month(7)
      .year(moment(new Date()).year())
      .valueOf(); //end of August this year
    let lastYearAugust = moment()
      .date(0)
      .month(7)
      .year(
        moment()
          .startOf("year")
          .subtract(1, "day")
          .year()
      )
      .valueOf(); //End of august last year.
    let daysArray = createDaysArray(
      this.props.activitiesArray,
      lastYearAugust,
      thisYearAugust
    );
    return daysArray; //TODO make this one line?
  }

  render() {
    if (!this.props.activitiesArray) {
      return <div>Loading Activities ...</div>;
    }
    return (
      <div>{`Activities Skied this season: ${
        this.getDaysArray().daysSkied
      }`}</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchActivities }, dispatch);
}

function mapStateToProps(state) {
  return {
    activitiesArray: state.activities
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DaysSkied);

/*
* Currently not using component as I want feedback from users on if this if valuable
* */