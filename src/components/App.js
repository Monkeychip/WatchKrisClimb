// @flow

import { Component } from "react";
import * as React from 'react';

import "../App.css";
import Activities from "../containers/activities";
import ActivitiesChart from "../containers/activitiesChart";
import Menu from "../containers/menu";

type Props = {
  children: React.Node,
};

class App extends Component<Props> {
  render() {
    return (
      <div id="component_holder" className="ui centered grid container ">
        <Menu />
        {this.props.children}
        <div className="row">
          <h2
            id="text-counter"
            className="ui middle aligned center aligned grid"
          >
            <Activities />
          </h2>
        </div>
        <div id="activitiesChart" className="sixteen wide column">
          <ActivitiesChart />
        </div>
      </div>
    );
  }
}

export default App;
