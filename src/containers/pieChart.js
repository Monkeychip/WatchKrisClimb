import React, {Component} from 'react';
import {connect} from 'react-redux'; //imported but some warnings
import {bindActionCreators} from 'redux';
import { PieChart, Pie, Sector, Cell, Label, Tooltip } from 'recharts';

const dataType = [{name: 'Elevation Skied', value: 400}, {name: 'Elevation Run', value: 300},  {name: 'Elevation Other', value: 200} ];
const percentLeft = [{name: 'Elevation Total', value: 900}, {name: 'Elevation Left', value: 600}];
const totalRaised = [{name: 'Amount Raised', value: 200}, {name: 'Fundraising Goal', value: 1000}];
const colorsType = ['#FE6627', '#029AE6', '#FFBB28']; //orange, blue, yellow
const colorsLeft = ['#FE6627', '#029AE6']; //orange, blue
const colorsRaised = ['#FFBB28', '#029AE6']; //yellow, blue

const RADIAN = Math.PI / 180;                    

export default class AGPieChart extends React.Component {
  render () {
    return (
      <PieChart width={1000} height={300} onMouseEnter={this.onPieEnter} >
        <Pie
          data={dataType} 
          cx={150} 
          cy={150} 
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
        <Pie
          data={percentLeft} 
          cx={480} 
          cy={150} 
          innerRadius={60}
          outerRadius={80} 
          fill="#e7e3e3"
          paddingAngle={5}
        >
          {
            percentLeft.map((entry, index) => <Cell fill={colorsLeft[index % colorsLeft.length]}/>)
          }
          <Label value="Elevation Climbed" position="center" fill="#e7e3e3"/>
        </Pie>
        <Pie
          data={totalRaised} 
          cx={810} 
          cy={150} 
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
    );
  }
}


