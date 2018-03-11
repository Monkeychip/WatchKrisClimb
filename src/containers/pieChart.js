import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import { fetchActivities, fetchActivitiesWithCode } from '../actions/actions_index';
import Chart from 'chart.js'; 
import { Doughnut } from 'react-chartjs-2';


//TO DO: import from activities Chart
function sumElevation(allActivities) {
  let addActivities = (a,b) => a + b 
  let arrayElevationGain = [];
  allActivities.forEach(activity => arrayElevationGain.push(activity.total_elevation_gain))
  let sumActivities = 0;
  if(arrayElevationGain.length > 0){ sumActivities = parseInt(arrayElevationGain.reduce(addActivities)/.3048,10)}
  return Number(sumActivities);
}

function elevationType(allActivities,type) {
  let year = (new Date()).getFullYear();
  let monthActivity = allActivities.filter(
    function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate > (new Date(year,0,0).getTime()))  //greater than last year at 12/31/2017
    })
  let elevationType = monthActivity.filter((value) => value.type === type); //now return based on value on month Activities
  return sumElevation(elevationType)
}


function monthElevation(monthData,timestamp) {
      
     let monthActivity = monthData.filter( //added data to widdle down
     function(value){
      let epochDate = new Date(String(value.start_date_local)).getTime();
      return (epochDate <  timestamp);  //today < 2017
    }
  )
    
  return sumElevation(monthActivity); // now with correct array run through the Sum Elevation and return that value  
}


class SkiingElevation extends Component{
  constructor(props) { 
    super(props) 
    //this.state = {term: 'heys'};
    this.getData = this.getData.bind(this);
  }
  getData(){
     let code = new URL(window.location.href).searchParams.get('code')
      if(!code){
        this.props.fetchActivities();
      }else{
       this.props.fetchActivitiesWithCode();
      };
  }
 
  componentDidMount() {this.getData(); }
  render() {
    if(!this.props.activities) {
      return(
        <div>Loading Pie Charts ...</div>
      );
    }
    /*Getting just this year's elevation gain*/
    let year = (new Date()).getFullYear();
    let month = 0; //january
    let lastYearsElevation = monthElevation(this.props.activities, new Date(year, month, -1).getTime())
    /*Data Varialbes for Pie Charts*/
    let totalElevation = sumElevation(this.props.activities);
    let thisYearsElevation = totalElevation - lastYearsElevation;
    let elevationRemaining = Number(500000 - thisYearsElevation);
    let elevationSkied = Number(elevationType(this.props.activities,"BackcountrySki"));
    let elevationRun = Number(elevationType(this.props.activities,"Run")); 
    let elevationOther = thisYearsElevation - (elevationSkied + elevationRun);



    Chart.defaults.global.responsive = true;

         const dataType = {
            labels: [
                "Elevation Skied"
            ],
            datasets: [  /*ataType.map((entry, index)*/
                {
                    data: [elevationSkied, elevationRemaining],
                    backgroundColor: [
                        "#029AE6",
                        "#888590"
                    ],
                    hoverBackgroundColor: [ //To Do: make these a shade darker
                        "#029AE6",
                        "#888590"
                    ]
                }]
        };

        const optionsType = {
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            },
            elements: {
               center: {
                  text: 'Ft. By Type',
                  color: '#e7e3e3', // Default is #000000
                  fontStyle: 'Roboto Condensed', // Default is Arial
                  sidePadding: 20 // Defualt is 20 (as a percentage)
                }
            },
            tooltips: {
              callbacks: {
                  title: function(tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                  },
                  label: function(tooltipItem, data) {
                    return `  ${(data['datasets'][0]['data'][tooltipItem['index']]).toLocaleString()}  ft`;
                  }
                }
            }
        };


       
/*Adding label inside fo the doughnuts*/
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        
        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
        
        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;
        
        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });

    return (
      <div >
          <Doughnut data={dataType} options={optionsType} />
      </div>
        
     );
  }
}

function mapStateToProps({activities}){
  return {activities};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchActivities, fetchActivitiesWithCode}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SkiingElevation);

/*      <div id="pieChart" className="three column wide centered row stackable">

        <div className="column max-height-col">
          <Doughnut data={dataType} options={optionsType} width="250" height="250"/>
        </div>

        <div className="column max-height-col">
          <Doughnut data={dataProgress} options={optionsTypeRemaining} width="250" height="250"/>
        </div>


        <div className="column max-height-col">
          <Doughnut data={dataRaised} options={optionsTypeMoney} width="250" height="250"/>
        </div>


      </div>*/
