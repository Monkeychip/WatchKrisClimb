export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_ACTIVITIES':
		console.log('action received:', action.payload.data[0].total_elevation_gain);
		return action.payload.data;
	}
	return state;
};