
export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_CODE':
		return action.payload;
	}
	return state;
};


