import { FETCH_CODE } from '../actions/types';

export default function(state = null, action){
	switch(action.type) {

	case FETCH_CODE: //when you call this action type.

		return action.payload;
	}
	return state;
};

