import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 
import Menu from './menu';
import { BarChartGoal, BarChartSki, BarChartBike, BarChartRun, BarChartElse } from '../containers/barChart';

class Table extends Component {
    render() {
      return (
        <div className="ui centered grid container" id="about-holder">

        <Menu />
        <div id="metrics_table" className="ui centered grid container">
                <h3>Breakdown By Week</h3>      
              <table className="ui basic padded celled table" width="100%">
                       <tbody>
                   <tr>
                    <td>
                      <h4 className="ui header" id="goal-emoji"> Total Elevation Gained per week relative to Goal?</h4>
                         <p className="ag-below-header">In Ft.</p>
                    </td>
                     <td className="center aligned"> <BarChartGoal /></td> 
      
                   </tr>
                   <tr>
                    <td>
                      <h4 className="ui header" id="time-climbing"> Elevation gained from Skiing?</h4>
                         <p className="ag-below-header">In Ft.</p>
                    </td>
                    <td className="center aligned"> <BarChartSki /></td> 
                   </tr>
                   <tr>
                      <td>
                      <h4 className="ui header" id="bike-emoji"> Elevation gained from biking?</h4>
                         <p className="ag-below-header">In Ft.</p>
                    </td>
                    <td className="center aligned"> <BarChartBike /> </td> 
                   </tr>
                   <tr>
                      <td>
                      <h4 className="ui header" id="run-emoji"> Elevation gained from running?</h4>
                         <p className="ag-below-header">In Ft.</p>
                    </td>
                    <td className="center aligned"> <BarChartRun /> </td> 
                   </tr>
                   <tr>
                    <td>
                      <h4 className="ui header" id="most-vertical"> Elevation gained from everything else?</h4>
                         <p className="ag-below-header">In Ft.</p>
                    </td>
                    <td className="center aligned"> <BarChartElse /> </td> 
                   </tr>
                  </tbody>
              </table>
              </div>
            </div>


      )
    }
}

export default Table;



//TO DO - move to Container folder because of the connect it's a HOC

/*
A. filter by backcountry ski activiites
B. create 1 function that takes timestamp, which filters A data into the time stamps of one week, one month, this year. Returns and array of the data.. (that's the key and potentially hard part this.properties.activities)
C. make five individual functions to keep it clean

1. TIME SPENT SKIING takes in array A [week,month,year] 
- grabs time , and SUMS them forEach item on the array
- return hrs, then mintues `${hrs min}` 

2. ELEVATION GAINED. takes in array A
- grabs the elevation gain, and sums them forEach
- returns ft.

3. AVERAGE RISE:RUN takes in array A
- forEach array of array, grabs the elevation gained (see #2) and distance, and ratio 
- averages based on week/month/year
- returns percent

4. AVERAGE UP HILL takes in array A
- forEach array of aray, takes elevation gained (see #2) and time.  Ft / seconds.
- avaerages based on week/month/year
- returns a percent

5. MOST VERTIFCAL FT IN DAY takes in array A
- finds max - I know there's an es6 array helper for this.
- returns data and totalelevation gained. 
*/

