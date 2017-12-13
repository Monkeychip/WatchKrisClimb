export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_ELEVATION':
		console.log('action received:', action.payload.data);
		return action.payload.data;
	}
	return state;
};