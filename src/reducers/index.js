//this file
//1. maps activities to it's reducer.  In other words now the key word to grab the data from reducer is activities.
//2. telling redux how to create application state.  Rember redux just holds data in the state object

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //grab reducer property off of it and call it formReducer
import ActivitiesReducer from './reducer_activities';
import ThisYearsActivitiesReducer from './reducer_thisyearsactivities';
import CodeReducer from './reducer_code';
import GoalReducer from './reducer_goal';

const rootReducer = combineReducers({
	activities: ActivitiesReducer,  
	thisYearsActivities: ThisYearsActivitiesReducer,
	goal: GoalReducer,
	//form: formReducer, //reducer is apart of the package
	code: CodeReducer 
});



export default rootReducer;

/*

Key -> actvities
Reducer -> Activities Reducer

//not using createStore, and probably should be.

GOAL get Activities Payload to go into application state, and access it from differnet parts of the app
*/

/*
import { createStore } from 'redux';
let store = createStore(counter);
console.log(store.getState()); // 0
*/