import axios from 'axios'; 
import {
 FETCH_ACTIVITIES,
 FETCH_AUTHORIZATION_TOKEN,
 FETCH_THIS_YEAR,
 ACCESS_TOKEN,
 FETCH_CODE
 } from './types'; 
import { janFirstLastYear, janFirstThisYear } from '../helperFunctions';
import {store} from '../reduxStore';

const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN}`; //TODO: replace with lamda function or dummy data

export function fetchGoal(){

    let goal = Number(localStorage.getItem('goal'));
    return {
        type: 'FETCH_GOAL',
        payload: goal
    }
}

export function fetchActivities(){
    let activities =
        axios.get(activitiesUrl, { params: {
                after: janFirstLastYear,
                before: janFirstThisYear,
                per_page: 200
            }});

    return {
        type: FETCH_ACTIVITIES,
        payload: activities
    };
}

export function fetchThisYear(){

    let thisYearsActivities =
        axios.get(activitiesUrl, { params: {
                after: janFirstThisYear,
                per_page: 200
            }});
    console.log(thisYearsActivities,"maybe")
    return {
        type: FETCH_THIS_YEAR,
        payload: thisYearsActivities
    };
}

export function fetchActivitiesPayload(activities){

    return {
        type: FETCH_ACTIVITIES,
        payload: activities
    };
}

export function fetchActivitiesPayloadThisYear(activitiesThisYear){

    return {
        type: FETCH_THIS_YEAR,
        payload: activitiesThisYear
    };
}

function fetchAuthorizationToken() {
    let GATEWAY_URL= ['https://pwgoqx1296.execute-api.us-east-1.amazonaws.com/beta/activities'];
    let code = new URL(window.location.href).searchParams.get('code') || store.getState().code //Needs to be in

    try {
        return fetch(GATEWAY_URL, { //lambda function
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                code: code
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            crossDomain: true
        }).then(response => {
            return response.json(); //puts into json object
        }).then(json => {
            return json.done.json
        }).then(data => {
            return { type: FETCH_AUTHORIZATION_TOKEN, payload: data}
        })
    } catch(e){
        return e;
    }
}

export function fetchActivitiesWithCode(){ //LAST YEAR FETCH_ACTIVITIES

    return (dispatch, getState) => {

        if(!getState().authorizationToken){ //TO DO: Put this in a if/else, but having issues with dispatch and promises defining a variable.  Revisit later.

            fetchAuthorizationToken()
                .then(() => {

                    return dispatch(fetchAuthorizationToken());

                })
                .then(() => {

                    let authorizationToken = getState().authorizationToken;

                    let pageOne = axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, {
                        params: {
                            after: janFirstLastYear,
                            before: janFirstThisYear,
                            page:1,
                            per_page: 100
                        }
                    });

                    let pageTwo = axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, { params: {
                            after: janFirstLastYear,
                            before: janFirstThisYear,
                            page: 2,
                            per_page: 100
                        }
                    });

                    return Promise.all([pageOne,pageTwo])

                })
                .then(object => {

                    let pageOne = object[0].data;
                    let pageTwo = object[1].data;

                    return pageOne.concat(pageTwo);

                })
                .then(object => {

                    return dispatch(fetchActivitiesPayload(object))

                })
        }else{

            (() => { //Is this OK?
                let authorizationToken = getState().authorizationToken;

                let pageOne = axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, {
                    params: {
                        after: janFirstLastYear,
                        before: janFirstThisYear,
                        page: 1,
                        per_page: 100
                    }
                });

                let pageTwo = axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`, {
                    params: {
                        after: janFirstLastYear,
                        before: janFirstThisYear,
                        page: 2,
                        per_page: 100
                    }
                });

                return Promise.all([pageOne, pageTwo])
            })
            .then(object => {

                let pageOne = object[0].data;
                let pageTwo = object[1].data;

                return pageOne.concat(pageTwo);

            })
            .then(object => {

                return dispatch(fetchActivitiesPayload(object))

            })
        }
    }
}

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



export function cleanStore(){
    localStorage.clear();
    return {
        type: 'LOG_OUT'
    }
}
export function fetchCode(){
    let code = new URL(window.location.href).searchParams.get('code') || store.getState().code;

    return {
        type: FETCH_CODE,
        payload: code
    }
}