import { LOG_OUT } from '../actions/types';

export default function(state = null, action){
  switch(action.type) {
    case LOG_OUT:
      return action;
  }
  return state
}

