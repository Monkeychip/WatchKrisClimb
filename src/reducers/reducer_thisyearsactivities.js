import { FETCH_THIS_YEAR } from '../actions/types';

export default function(state = null, action){

	switch(action.type) {

	case FETCH_THIS_YEAR:
        return action.payload.data;
	}
	return state;
};



//Handles the application state of TYA this years activities.  
//reducers get two arguments, current state and action.
//1. State argument is not application state, but state this reducer is for.  FUCK missed that.
/*
redux doesn't allow undefined, default value of state argument to null or 0
*/

//2. action 
