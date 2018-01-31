import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 

class Table extends Component {

    render() {
      return (
              <table className="ui basic padded celled table" width="100%">
                <thead>
                    <tr>
                      <th></th>
                      <th className="center aligned">Week</th>
                      <th className="center aligned">Month</th>
                      <th className="center aligned">Year</th>
                    </tr>
                  </thead>
                  <tbody>

                  <tr>
                    <td>
                      <h4 className="ui header" id="time-climbing"> How much time have you spent skiing?</h4>
                         <p className="ag-below-header">In hours and minutes</p>
                    </td>
                    <td className="center aligned"> 4 hrs 30 min </td>
                    <td className="center aligned"> 22 hrs 42 min</td>
                    <td className="center aligned"> 90 hrs 12 min</td>
                   </tr>
                   <tr>
                    <td>
                      <h4 className="ui header" id="elevation-from-skiing"> Elevation gained from skiing</h4>
                         <p className="ag-below-header">In feet</p>
                    </td>
                    <td className="center aligned"> 10,000 ft </td>
                    <td className="center aligned"> 22,000 ft</td>
                    <td className="center aligned"> 31,000 ft</td>
                   </tr>
                   <tr>
                    <td>
                      <h4 className="ui header" id="avg-rise-run"> On Avg, how steep was it?</h4>
                         <p className="ag-below-header">Avg. Rise / Run e.g Elevation Gain/Distance</p>
                    </td>
                    <td className="center aligned"> 2.2 % </td>
                    <td className="center aligned"> 3.2 % </td>
                    <td className="center aligned"> 4.6 %</td>
                   </tr>
                   <tr>
                    <td>
                      <h4 className="ui header" id="feet-per-second">On Avg, what percent of your skiing time is going up hill?</h4>
                         <p className="ag-below-header">Avg. number of feet per second spent going up-hill, based on moving time</p>
                    </td>
                    <td className="center aligned" > 66 %
                    </td>
                    <td className="center aligned"> 58 %
                    </td>
                    <td className="center aligned"> 49 %
                    </td>
                   </tr>
                   <tr>
                      <td>
                      <h4 className="ui header" id="most-vertical">Most Vertical Ft.</h4>
                         <p className="ag-below-header">Accumlated in one activity.</p>
                    </td>
                    <td className="center aligned"> Jan 17, 2018. <br/>
                         7,131 ft
                    </td>
                    <td className="center aligned"> Feb 28, 2018. <br/>
                         10,211 ft
                    </td>
                    <td className="center aligned"> March 28, 2018. <br/>
                         13,211 ft
                    </td>
                   </tr>
                  </tbody>
              </table>


      )
    }
}

export default connect(null,actions)(Table);

