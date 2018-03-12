//this file
//1. maps activities to it's reducer.  In other words now the key word to grab the data from reducer is activities.
//2. telling redux how to create application state.  Rember redux just holds data in the state object

import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //grab reducer property off of it and call it formReducer
import ActivitiesReducer from './reducer_activities';
import CodeReducer from './reducer_code';

const rootReducer = combineReducers({
	activities: ActivitiesReducer,
	form: formReducer, //reducer is apart of the package
	code: CodeReducer 
});

export default rootReducer;

