import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //grab reducer property off of it and call it formReducer

import ActivitiesReducer from './reducer_activities';
import ThisYearsActivitiesReducer from './reducer_thisyearsactivities';
import CodeReducer from './reducer_code';
import AuthorizationToken from './reducer_authorizationtoken';
import logInReducer from './reducer_logIn';
import { LOG_OUT } from '../actions/types';

const appReducer = combineReducers({
  activities: ActivitiesReducer,
  thisYearsActivities: ThisYearsActivitiesReducer,
  authorizationToken: AuthorizationToken,
  form: formReducer, //reducer is apart of the package
  login: logInReducer,
  code: CodeReducer
});

const rootReducer = (state, action) => {
  if(action.type === LOG_OUT) {
    state = undefined
  }
  return appReducer(state,action)
}

export default rootReducer;


