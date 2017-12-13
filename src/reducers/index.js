//created this file
import { combineReducers } from 'redux';
import ReducerProfile from './reducer_profile';
import ReducerActivites from './reducer_activities';
import ReducerElevation from './reducer_elevation';

const rootReducer = combineReducers({
	//profile: ReducerProfile,
	activities: ReducerActivites,
	elevation: ReducerElevation
});

export default rootReducer;