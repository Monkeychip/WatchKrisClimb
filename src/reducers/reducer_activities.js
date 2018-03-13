export default function(state = null, action){
	switch(action.type) {
	case 'FETCH_ACTIVITIES': //reducer needs to return new object each time return state
	console.log(action.payload.data,"from the reducer_activities")
		return action.payload.data; //{...state,all: action.payload.data}
	}
	return state;
};


/*
Could break this up so returns array of data, but also runs the filter for days, etc.

const INITIAL_STATE = { all: [] , thisyear: null, last year: null}

*/