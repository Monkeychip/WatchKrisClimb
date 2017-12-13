export default function(state = null, action){
	switch(action.type){
		case 'FETCH_PROFILE':
		return action.payload.data;
	}
	return state;
};