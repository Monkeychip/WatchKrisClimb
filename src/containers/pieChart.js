import React, {Component} from 'react';
import {connect} from 'react-redux'; //imported but some warnings
import {bindActionCreators} from 'redux';
import { fetchActivities } from '../actions/index';
import { PieChart, Pie, Sector, Cell, Label, Tooltip, ResponsiveContainer } from 'recharts';

//TO DO: import from activities Chart
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
      let sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10); //convert to ft.
      return Number(sumActivities);
}

function elevationType(allActivities,type) {
  let elevationType = allActivities.filter((value) => value.type == type);
  return sumElevation(elevationType)
}


class ActivitiesPieChart extends Component{
  constructor(props) { 
    super(props) 
    this.state = {term: 'heys'};
    this.getData = this.getData.bind(this);
  }
  getData(){
    this.props.fetchActivities();
  }
 
  componentDidMount() {this.getData(); }
  render() {
    if(!this.props.activities) {
      return(
        <div>Loading Pie Charts ...</div>
      );
    }
    let totalElevation = sumElevation(this.props.activities);
    let otherElevation = totalElevation - ( elevationType(this.props.activities,"Run") + elevationType(this.props.activities,"BackcountrySki") ); 
    let remainingElevation = 500000 - totalElevation;
    const dataType = [{name: 'Elevation Skied', value: elevationType(this.props.activities,"BackcountrySki")}, {name: 'Elevation Run', value: elevationType(this.props.activities,"Run")},  {name: 'Elevation Other', value: otherElevation} ];
    const percentLeft = [{name: 'Elevation Total', value: totalElevation}, {name: 'Elevation Left', value: remainingElevation}];
    const totalRaised = [{name: 'Amount Raised', value: 200}, {name: 'Fundraising Goal', value: 1000}];
    const colorsType = ['#029AE6', '#FE6627', '#FFBB28']; //blue, orange, yellow
    const colorsLeft = ['#FE6627', '#029AE6']; //orange, blue
    const colorsRaised = ['#FFBB28', '#029AE6']; //yellow, blue

    const RADIAN = Math.PI / 180;                    
//sixteen wide mobile eight wide tablet four wide computer column
    return (
        <div id="pieChart" className="five column wide row stackable">
          <div className="column min-height-col">
            <PieChart onMouseEnter={this.onPieEnter} width={800} height={400}>
              <Pie
                data={dataType} 
                innerRadius={60}
                outerRadius={80} 
                fill="#e7e3e3"
                paddingAngle={5}
              >
                {
                  dataType.map((entry, index) => <Cell fill={colorsType[index % colorsType.length]}/>)
                }
                <Label value="Elevation by Type" position="center" fill="#e7e3e3"/>
              </Pie>
              <Tooltip />
            </PieChart>
          </div>    

          <div className="column min-height-col">

            <PieChart onMouseEnter={this.onPieEnter} width={800} height={400} >
              <Pie
                data={percentLeft} 
                innerRadius={60}
                outerRadius={80} 
                fill="#e7e3e3"
                paddingAngle={5}
              >
                {
                  percentLeft.map((entry, index) => <Cell fill={colorsLeft[index % colorsLeft.length]}/>)
                }
                <Label value="Elev. Climbed / Goal" position="center" fill="#e7e3e3"/>
              </Pie>
              <Tooltip />
            </PieChart>

          </div>
         <div className="column min-height-col">

          <PieChart onMouseEnter={this.onPieEnter} width={800} height={400}>
            <Pie
              data={totalRaised} 
              innerRadius={60}
              outerRadius={80} 
              fill="#e7e3e3"
              paddingAngle={5}
            >
              {
                totalRaised.map((entry, index) => <Cell fill={colorsRaised[index % colorsRaised.length]}/>)
              }
              <Label position="center" value="Amount Raised" fill="#e7e3e3" />
            </Pie>
            <Tooltip />
          </PieChart>

          </div>
     </div>
     );
  }
}

function mapStateToProps({activities}){
  return {activities};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchActivities}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPieChart);

