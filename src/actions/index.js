import axios from 'axios'; 
import { browserHistory } from 'react-router'; //communicate information about URL, can also use to make changes to URL

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


const ROOT_URL = 'https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://watchkrisclimb.s3-website.us-east-2.amazonaws.com&state=mystate';

export function authenticationRedirect(){
      return dispatch => {
        axios.post(ROOT_URL)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }
  //Sumbit email and password to server - don't need this 
  //if good ...
      //update state to indicate user is auhtenticate = mystate
      // save JWT token (code?)
      // send to fetchAcitivites action

  //if return error=access_denied
}




/*
https://www.strava.com/oauth/authorize?
  client_id=21992
  &response_type=code
  &redirect_uri=http://testapp.com/token_exchange
  &scope=write
  &state=mystate
  &approval_prompt=force


client_secret = 22664cc703cd3adbff5dea59fda7d2439d33393


*/

/*
1. Redirect to https://www.strava.com/oauth/authorize
2. User says yes
3. Get sent code to my app
4. take this code along with my client id and secret and retreive the authorization token
		The application must now exchange the temporary authorization code for an access token, using its client ID and client secret. 
		The endpoint is https://www.strava.com/oauth/token.
5. proceed with axios request.

// client_id: 21992
// redirect_uri: watchkrisclimb.s3-website.us-east-2.amazonaws.com
// response_type: `string`
// approval_prompt: `force` or `auto`
// scope: `view_private` The requested scopes of the eventual token

`public`: default, private activities are not returned, privacy zones are respected in stream requests.
`write`: modify activities, upload on the user’s behalf.
`view_private`: view private activities and data within privacy zones.
`view_private,write`:both ‘view_private’ and ‘write’ access.
state 
string, in query	Returned to your application in the redirect URI. Useful if the authentication is done from various points in an app.
*/