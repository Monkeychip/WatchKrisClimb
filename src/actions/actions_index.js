import axios from 'axios'; 
import {
 FETCH_ACTIVITIES,
 FETCH_THIS_YEAR,
 ACCESS_TOKEN,
 CLIENT_SECRET,
 CLIENT_ID,
 FETCH_CODE //need to have per redux-form though not listed as action
 } from './types'; 
import { janFirstLastYear, janFirstThisYear } from '../helperFunctions';
import {store} from '../reduxStore';

  
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN}`;

const SERVER_URL ='http://localhost:3002/auth/strava'; //this is the url of the API server that you made

export function fetchMessage(){ 
  return function(dispatch){
    //when time comes you would cancel this out, and you don't need it unless you want to keep the server functionality.
    window.location.href = SERVER_URL; 
  }
}

export function fetchGoal(){

    let goal = Number(localStorage.getItem('goal'));
    return {
        type: 'FETCH_GOAL',
        payload: goal
    }
}

/*Fetches last year */
export function fetchActivities(){
  
  let activities = 
    axios.get(activitiesUrl, { params: {
      after: janFirstLastYear,
      before: janFirstThisYear,
      per_page: 200
    }});
  
  return {
    type: 'FETCH_ACTIVITIES',
    payload: activities 
  };
}

export function fetchThisYear(){
  
let thisYearsActivities = 
    axios.get(activitiesUrl, { params: {
      after: janFirstThisYear,
      per_page: 200
    }});
  return {
    type: FETCH_THIS_YEAR,
    payload: thisYearsActivities 
  };
}

export function fetchActivitiesPayload(activities){
  
  return {
    type: 'FETCH_ACTIVITIES',
    payload: activities
  };
}

export function fetchActivitiesPayloadThisYear(activitiesThisYear){
  
  return {
    type: FETCH_THIS_YEAR,
    payload: activitiesThisYear
  };
}


export function fetchActivitiesWithCode(){
    return function action(dispatch){
        dispatch({ type: FETCH_ACTIVITIES })

        let GATEWAY_URL= "https://pwgoqx1296.execute-api.us-east-1.amazonaws.com/beta/activities";
            let code = new URL(window.location.href).searchParams.get('code') || store.getState().code //Needs to be in Application State

            fetch(GATEWAY_URL, { //lambda function
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    //code: 'a0b9cff13b19d0b9f86a759e38a3d133fba3dcc8' //replace
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

            }).then( json => {
                console.log(json.done.json,"success");
                return json.done.json
            }).then( authtoken => {
                const activitiesUrlUpdated = `https://www.strava.com/api/v3/athlete/activities?access_token=${authtoken}`;

            return axios.get(activitiesUrlUpdated, { params: {
                    after: janFirstLastYear,
                    before: janFirstThisYear,
                    per_page: 200
                }});

            }).then(response => {
                return dispatch(fetchActivitiesPayload(response));
            });
    }
}

export function fetchActivitiesWithCodeThisYear(){

 return function action(dispatch){
  dispatch({ type: FETCH_ACTIVITIES })

    let parameters = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: new URL(window.location.href).searchParams.get('code') || store.getState().code//Needs to be in Application State
    };

  axios.post('https://www.strava.com/oauth/token', parameters)
  .then(response => {
    const activitiesUrlUpdated = `https://www.strava.com/api/v3/athlete/activities?access_token=${response.data.access_token}`;
    return axios.get(activitiesUrlUpdated, { params: {
            after: janFirstThisYear,
            per_page: 200 //TODO: THIS NEEDS TO BE LARGER
          }})
  })
  .then(response => {
    return dispatch(fetchActivitiesPayloadThisYear(response));
  })

 } 
}

export function cleanStore(){

    localStorage.clear();

    return {
        type: 'LOG_OUT'
    }
}

export function fetchCode(){
    let code = new URL(window.location.href).searchParams.get('code') || store.getState().code
    return {
        type: 'FETCH_CODE',
        payload: code
    }
}




