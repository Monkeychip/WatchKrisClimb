import { LOG_IN } from '../actions/types';

export default function(state = null, action){

  switch(action.type) {
    case LOG_IN:
    return null; //fire off the function
  }
  return state
}

