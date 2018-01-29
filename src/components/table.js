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
                      <h4 className="ui header" id="avg-speed-uphill">Avg. Speed Uphill</h4>
                         <p className="ag-below-header">Ex: 1 mile / 1hr = 1 mph </p>
                    </td>
                    <td className="center aligned"> 3.2 mph</td>
                    <td className="center aligned"> 2.2 mph</td>
                    <td className="center aligned"> 2.6 mph</td>
                   </tr>
                   <tr>
                      <td>
                      <h4 className="ui header" id="longest-climb">Longest Climb</h4>
                         <p className="ag-below-header">Must be consecutive, no downs, just one solid up effort</p>
                    </td>
                    <td className="center aligned"> Jan 17, 2018. <br/>
                         3,131 ft
                    </td>
                    <td className="center aligned"> Feb 28, 2018. <br/>
                         3,211 ft
                    </td>
                    <td className="center aligned"> Feb 28, 2018. <br/>
                         3,211 ft
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

