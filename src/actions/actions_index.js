import axios from 'axios'; 
import {
 FETCH_ACTIVITIES,
 ACCESS_TOKEN,
 CLIENT_SECRET,
 CLIENT_ID,
 FETCH_CODE
 } from './types'; 
  
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN}`;

const SERVER_URL ='http://localhost:3002/auth/strava'; //this is the url of the API server that you made

export function fetchMessage(){ 
  return function(dispatch){
    //when time comes you would cancel this out, and you don't need it unless you want to keep the server functionality.
    window.location.href = SERVER_URL; 
  }
}

export function fetchCode(){
  let code = new URL(window.location.href).searchParams.get('code') ;
  console.log(code, "from action guy");
  return {
    type: 'FETCH_CODE',
    payload: code
  }
}


//only call on initial load
export function fetchActivities(){
  
  let activities = 
    axios.get(activitiesUrl, { params: {
      after: 1483228800,
      per_page: 180
    } } );
  
  return {
    type: 'FETCH_ACTIVITIES',
    payload: activities //returns an array of two
  };
}


export function fetchActivitiesPayload(activities){
  return {
    type: 'FETCH_ACTIVITIES',
    payload: activities
  };
}

export function fetchActivitiesWithCode(){
 return function action(dispatch){
  dispatch({ type: FETCH_ACTIVITIES })

    let parameters = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: new URL(window.location.href).searchParams.get('code') //string
    };
    //not sure if i can persist this code, but I ultimately want to save it so on routing I can feed it to Fetch Activities

  axios.post('https://www.strava.com/oauth/token', parameters)
  .then(response => {
    const activitiesUrlUpdated = `https://www.strava.com/api/v3/athlete/activities?access_token=${response.data.access_token}`;
    return axios.get(activitiesUrlUpdated, { params: {
            after: 1483228800, //TODO: THESE NEED TO BE VARIABLES 
            per_page: 180 //TODO: THIS NEEDS TO BE LARGER
            //I do see these in the payload
          }})
  })
  .then(response => {
    return dispatch(fetchActivitiesPayload(response));
  })

 } 
}

