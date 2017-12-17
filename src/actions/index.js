import axios from 'axios'; 
const access_token ='cf54b77cbf20643e7cafb2dc1522fdcb42df4930' //kris
const athlete_id ='7153' //kris
const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;
const elevationUrl = `https://www.strava.com/api/v3/athletes/${athlete_id}/stats?access_token=${access_token}`;

let date = new Date();

export function fetchActivities(){
	const activities = axios.get(activitiesUrl, { params: {
    after: 1483228800,
    per_page: 175
  } } )
	return{
		type: 'FETCH_ACTIVITIES',
		payload: activities
	}
};

/*export function fetchActivitiesJan(){
	const activitiesJan = axios.get(activitiesUrl, { params: {
    //after: date.setFullYear(2017,2,1), //feb 1 2017 should return
    after: 1485907200,
    per_page: 200
  } } )
	return{
		type: 'FETCH_JAN',
		payload: activitiesJan
	}
};
*/