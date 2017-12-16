export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_ACTIVITIES':
        console.log(action.payload.data); //returns what I want*/
	
		return action.payload.data;
	}
	return state;
};