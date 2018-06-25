import {fetchActivitiesPayloadThisYear} from "./actions_index";
import {janFirstThisYear} from "../helperFunctions";
import axios from "axios/index";

export function fetchActivitiesWithCodeThisYear(){

    return (dispatch, getState) => {

        if(!getState().authorizationToken){
            fetchAuthorizationToken()
                .then(() => {
                    return dispatch(fetchAuthorizationToken());
                })
                .then(() => {
                    let authorizationToken = getState().authorizationToken;
                    return axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, { params: {
                            after: janFirstThisYear,
                            per_page: 200,
                            page: 1
                        }})
                })
                .then(data => {
                    return dispatch(fetchActivitiesPayloadThisYear(data));
                })
        }else{
            let authorizationToken = getState().authorizationToken;

            return axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, { params: {
                    after: janFirstThisYear,
                    per_page: 200
                }})
                .then(data => {
                    return dispatch(fetchActivitiesPayloadThisYear(data));
                })
        }
    };
}