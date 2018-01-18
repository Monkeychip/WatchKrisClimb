export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_ACTIVITIES':
		return action.payload.data;
	}
	return state;
};