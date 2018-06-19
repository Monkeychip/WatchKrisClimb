//this file
//1. maps activities to it's reducer.  In other words now the key word to grab the data from reducer is activities.
//2. telling redux how to create application state.  Rember redux just holds data in the state object

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //grab reducer property off of it and call it formReducer
import ActivitiesReducer from './reducer_activities';
import ThisYearsActivitiesReducer from './reducer_thisyearsactivities';
import CodeReducer from './reducer_code';
import AuthorizationToken from './reducer_authorizationtoken';

const appReducer = combineReducers({
	activities: ActivitiesReducer,  
	thisYearsActivities: ThisYearsActivitiesReducer,
	authorizationToken: AuthorizationToken,
	form: formReducer, //reducer is apart of the package
	code: CodeReducer 
});

const rootReducer = (state, action) => {
	if(action.type === 'LOG_OUT') {
		state = undefined
	}
    return appReducer(state,action)
}

export default rootReducer;

/*
To clear store when users logouts.
- reducers return initial state when they are called with undefined
- thus if action is log_out, we are going to strip out state by calling undefined.
https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
*/

