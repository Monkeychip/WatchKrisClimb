import React from 'react';
import { Component } from 'react';

import MenuNoLogIn from '../components/menuNoLogIn';
import BarChartGoal from '../containers/barChart';
import BarChartSki from '../containers/barChartSki';
import BarChartBike from '../containers/barChartBike';
import BarChartRun from '../containers/barChartRun';
import BarChartElse from '../containers/barChartElse';

class Table extends Component {
  render() {
    return (
      <div className="ui centered grid container" id="about-holder">
        <MenuNoLogIn/>
        <div id="metrics_table" className="ui centered grid container">
          <h3>Breakdown By Week</h3>
          <table className="ui basic padded celled table" width="100%">
            <tbody>
            <tr>
              <td>
                <h4 className="ui header" id="goal-emoji"> Total Elevation Gained per week relative to Goal?</h4>
                <p className="ag-below-header">In Ft.</p>
              </td>
              <td className="center aligned"><BarChartGoal/></td>
            </tr>
            <tr>
              <td>
                <h4 className="ui header" id="time-climbing"> Elevation gained from Skiing?</h4>
                <p className="ag-below-header">In Ft.</p>
              </td>
              <td className="center aligned"><BarChartSki/></td>
            </tr>
            <tr>
              <td>
                <h4 className="ui header" id="bike-emoji"> Elevation gained from biking?</h4>
                <p className="ag-below-header">In Ft.</p>
              </td>
              <td className="center aligned"><BarChartBike/></td>
            </tr>
            <tr>
              <td>
                <h4 className="ui header" id="run-emoji"> Elevation gained from running?</h4>
                <p className="ag-below-header">In Ft.</p>
              </td>
              <td className="center aligned"><BarChartRun/></td>
            </tr>
            <tr>
              <td>
                <h4 className="ui header" id="most-vertical"> Elevation gained from everything else?</h4>
                <p className="ag-below-header">In Ft.</p>
              </td>
              <td className="center aligned"><BarChartElse/></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Table


