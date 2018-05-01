import {FETCH_THIS_YEAR} from '../actions/types';

export default function(state = 0, action){
	switch(action.type) {
	case FETCH_THIS_YEAR: //when you call this action type.  
		return action.payload.data; //putting in arrary because I don't know
	}
	return state;
};



//DOESN"T SOLVE MY PROBLEM BUT CLOSER.


