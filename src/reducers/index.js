//this file
//1. maps activities to it's reducer.  In other words now the key word to grab the data from reducer is activities.
//2. telling redux how to create application state.  Rember redux just holds data in the state object

//now the form knows how to handle data coming from the Form Component
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //for submit action on form
import ActivitiesReducer from './reducer_activities';

const rootReducer = combineReducers({
	activities: ActivitiesReducer,
	form: formReducer //reducer is apart of the package
});

export default rootReducer;