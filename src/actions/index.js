import axios from 'axios'; 
const access_token ='cf54b77cbf20643e7cafb2dc1522fdcb42df4930' //kris
const athlete_id ='7153' //kris
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;
const elevationUrl = `https://www.strava.com/api/v3/athletes/${athlete_id}/stats?access_token=${access_token}`;

let date = new Date();

export function fetchActivities(){
	const activities = axios.get(activitiesUrl, { params: {
    after: 1483228800,
    per_page: 50
  } } )
	return{
		type: 'FETCH_ACTIVITIES',
		payload: activities
	}
};

