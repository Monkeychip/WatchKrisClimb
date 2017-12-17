//created this file
import { combineReducers } from 'redux';
import ReducerActivites from './reducer_activities';
//import ReducerJan from './reducer_jan';

const rootReducer = combineReducers({
	activities: ReducerActivites
	//would add here, with comma after Reducer Actvities
});

export default rootReducer;