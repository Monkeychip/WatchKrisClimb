import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { fetchActivities} from '../actions/actions_index'; //importing activities axios data

function createDaysArray(allData,startFilter,endFilter){ //TODO put into helper function

  let filteredActvitiesbyAugust = allData.filter(
    function(value){
      let activityDate = moment(new Date(String(value.start_date_local))).valueOf();
         return (activityDate > startFilter && activityDate < endFilter);  
    }
  )
  //TO DOnow to filter and return count might be easier way with object.keys
  let dataObject = {
        'daysSkied' : 0,
        'daysRun' : 0,
        'daysBiked' : 0,
        'daysElse' : 0
  };

  
  for( let [type,value] of Object.entries(filteredActvitiesbyAugust)){
    //console.log(type,value.type)
    if(value.type === "BackcountrySki"){
      ++dataObject.daysSkied;
    }
  } 
  return dataObject;
}


class DaysSkied extends Component{

	 
    getDaysArray(){
      let thisYearAugust = (moment().date(0).month(7).year(moment(new Date()).year()).valueOf()); //end of August this year
      let lastYearAugust = (moment().date(0).month(7).year(moment().startOf('year').subtract(1,'day').year()).valueOf()); //End of august last year.
      let daysArray = createDaysArray(this.props.activitiesArray,lastYearAugust,thisYearAugust);
      return daysArray; //TODO make this one line?
    }

  render() {

    if(!this.props.activitiesArray){     
      return(
          <div>Loading Activities ...</div>
        );
    }

    return(
    	
     	<div>{`Activities Skied this season: ${this.getDaysArray().daysSkied}`}</div>
     )
    }


}

//export default Table;
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchActivities } , dispatch)
}

/* CONNNECTING TO APPLICATION STATE*/
function mapStateToProps(state){

  return {
    activitiesArray: state.activities // this.props.activitiesArray now accessible in the component.
    //whatever container here is === this.props of component asdf: 123 this.props.asdf == 123
    //see the reducer key for getting activiites name
  }
}
//connect function says take component, and return container
export default connect(mapStateToProps, mapDispatchToProps)(DaysSkied);


