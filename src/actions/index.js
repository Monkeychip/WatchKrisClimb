//adding
import axios from 'axios'; //imported
//const access_token = '5a75c79d19d9994c0c98bbb843225dbcfecacf5f' //should hide
const access_token ='cf54b77cbf20643e7cafb2dc1522fdcb42df4930' //kris
const athlete_id ='7153'
//const athlete_id ='578430'
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
//after: 1483228801

export function fetchActivities(){
	const activities = axios.get(activitiesUrl, { params: {
    after: 1483228801,
    per_page: 200
  } } )
	return{
		type: 'FETCH_ACTIVITIES',
		payload: activities
	}
};

export function fetchElevation(){
	const elevation = axios.get(elevationUrl);
	return{
		type: 'FETCH_ELEVATION',
		payload: elevation
	}
}