import axios from 'axios'; 
import {
 CHANGE_AUTH, 
 FETCH_ACTIVITIES,
 ACCESS_TOKEN,
 CLIENT_SECRET,
 CLIENT_ID
 } from './types'; 
 
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN}`;

//passing boolean.  For authentication then goes to reducer
export function authenticate(isLoggedIn){
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

const SERVER_URL ='http://localhost:3002/auth/strava'; //this is the url of the API server that you made

export function fetchMessage(){ 
  return function(dispatch){
    //when time comes you would cancel this out, and you don't need it unless you want to keep the server functionality.
    window.location.href = SERVER_URL; 
  }
}

//only call on initial load
export function fetchActivities(){
  
  let activities = axios.get(activitiesUrl, { params: {
    after: 1514790000,
    //after: 1483228800, 01/01/2017
    per_page: 150
  } } )
  return{
    type: 'FETCH_ACTIVITIES',
    payload: activities
  }
};

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
    

  axios.post('https://www.strava.com/oauth/token', parameters)
  .then(response => {
    const activitiesUrlUpdated = `https://www.strava.com/api/v3/athlete/activities?access_token=${response.data.access_token}`;
    console.log(response.data, "response data, should be Kris?")
    return axios.get(activitiesUrlUpdated, { params: {
            after: 1514790000,
            //after: 1483228800,
            per_page: 150
          }})
  })
  .then(response => {
    return dispatch(fetchActivitiesPayload(response));
  })

 } 
}
/*TO DO: SUPER CLOSE, I'm RETURNING THE OBJECT, but it's not getting sent back to the activities creator or something... trace it down.*/

