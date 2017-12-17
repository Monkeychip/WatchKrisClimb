export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_JAN':
        console.log(action.payload.data,"January"); 
		return action.payload.data;
	}
	return state;
};