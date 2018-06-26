import { FETCH_AUTHORIZATION_TOKEN } from "../actions/types";

export default function(state = null, action){
    switch(action.type) {

        case FETCH_AUTHORIZATION_TOKEN:

            return action.payload;
        // no default
    }
    return state;
};
