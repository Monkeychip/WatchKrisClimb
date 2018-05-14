export default function(state = 0, action){
    switch(action.type) {
        case 'FETCH_GOAL': //when you call this action type.
            return action.payload;
    }
    return state;
};
