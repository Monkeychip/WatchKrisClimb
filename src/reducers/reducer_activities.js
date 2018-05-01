
/*JUST GET THE FIRST YER*/
export default function(state = 0, action){
	switch(action.type) {
		case 'FETCH_ACTIVITIES': //reducer needs to return new object each time return state		
				return action.payload.data;
			}
		return state
}





/*
export default (state = 0, action) => {

    switch(action.type) {
        case 'FETCH_ACTIVITIES':
            return [...state, action.payload.data]; // same as state.concat(action.portfolio)
        case 'FETCH_THIS_YEAR':
        	return [...state, "meep"];
        default:
            return state;
    }
}*/