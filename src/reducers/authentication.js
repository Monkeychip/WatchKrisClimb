import { CHANGE_AUTH } from '../actions/types';

//by default user is not logged in, e.g. state = false
//taking the action return whether acton creator logged in
export default function(state = false, action){
	switch(action.type){
		case CHANGE_AUTH :
			return action.payload;
	}
	return state;
}