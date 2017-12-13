//adding
import axios from 'axios'; //imported
const access_token = '5a75c79d19d9994c0c98bbb843225dbcfecacf5f' //should hide
const athlete_id ='578430'
//const profileUrl = `https://www.strava.com/api/v3/athlete?access_token=${access_token}`;
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;
const elevationUrl = `https://www.strava.com/api/v3/athletes/${athlete_id}/stats?access_token=${access_token}`;

/*export function fetchProfile(){
	console.log("angel working");
	const request = axios.get(profileUrl);

	return {
		type: 'FETCH_PROFILE',
		payload: request	
	}
};*/

export function fetchActivities(){
	const activities = axios.get(activitiesUrl);
	return{
		type: 'FETCH_ACTIVITIES',
		payload: activities
	}
};

export function fetchElevation(){
	const elevation = axios.get(elevationUrl);
	console.log(elevation);
	return{
		type: 'FETCH_ELEVATION',
		payload: elevation
	}
}