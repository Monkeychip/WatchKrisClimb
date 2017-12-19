//this file
//1. maps activities to it's reducer.  In other words now the key word to grab the data from reducer is activities.
//2. telling redux how to create application state.  Rember redux just holds data in the state object

import { combineReducers } from 'redux';
import ActivitiesReducer from './reducer_activities';
//import ReducerJan from './reducer_jan';

const rootReducer = combineReducers({
	activities: ActivitiesReducer
	//would add here, with comma after Reducer Actvities
	//activities is used in the container after mapstateprops passed in
});

export default rootReducer;