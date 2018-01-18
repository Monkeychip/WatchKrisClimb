import axios from 'axios'; 
import { browserHistory } from 'react-router'; //communicate information about URL, can also use to make changes to URL
import { CHANGE_AUTH } from './types'; // impoting types  

const access_token ='5a75c79d19d9994c0c98bbb843225dbcfecacf5f' //kris
const athlete_id ='7153' //kris
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;
const elevationUrl = `https://www.strava.com/api/v3/athletes/${athlete_id}/stats?access_token=${access_token}`;

let date = new Date();

export function fetchActivities(){
	const activities = axios.get(activitiesUrl, { params: {
    after: 1483228800,
    per_page: 150
  } } )
	return{
		type: 'FETCH_ACTIVITIES',
		payload: activities
	}
};

//passing boolean.  For authentication then goes to reducer
export function authenticate(isLoggedIn){
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

const ROOT_URL ='http://localhost:3002/auth/strava'; //this is the url of the API server that you made
//having 302 issues
export function fetchMessage(){ 
  return function(dispatch){ 
    axios.get(`${ROOT_URL}`) //trys to return a promise, 
      .then(response => {
          console.log(response);
      });
  }
}



