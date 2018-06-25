import { FETCH_ACTIVITIES } from '../actions/types';

export default function(state = 0, action){

	switch(action.type) {
		case FETCH_ACTIVITIES:
            console.log(action.payload,"angel")
            return action.payload;
		}
		return state
}




