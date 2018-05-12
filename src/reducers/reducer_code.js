//import { FETCH_CODE } from '../actions/types';

export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_CODE': //when you call this action type.  
		return action.payload;
	}
	return state;
};


/*
switch(action.type) {
    case 'FETCH_CODE':
}

    * 1. check store?
    * 2. if no code in store, fetch URL.
    * 3. if no url and no store, return ull?
    * 4. if no code in store, but URL, save in store.
    * */


