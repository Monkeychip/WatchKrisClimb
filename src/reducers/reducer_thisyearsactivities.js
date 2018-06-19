import { FETCH_THIS_YEAR } from '../actions/types';

export default function(state = null, action){

	switch(action.type) {

	case FETCH_THIS_YEAR:
        return action.payload.data;
	}
	return state;
};
