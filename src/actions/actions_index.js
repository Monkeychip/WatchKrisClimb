import axios from "axios";

import {
  FETCH_ACTIVITIES,
  FETCH_AUTHORIZATION_TOKEN,
  FETCH_THIS_YEAR,
  ACCESS_TOKEN_MINE,
  FETCH_CODE,
  FETCH_GOAL,
  LOG_OUT,
  LOG_IN
} from "./types";
import { janFirstLastYear, janFirstThisYear } from "../helperFunctions";
import { store } from "../reduxStore";

const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN_MINE}`; //TODO: replace with lamda function or dummy data

export function logIn() {
  let logInNow = () => {
    //window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`;
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://winteredition.io`;
  };
  logInNow();
  return {
    type: LOG_IN
  };
}

export function fetchGoal() {
  let goal = Number(localStorage.getItem("goal"));

  return {
    type: FETCH_GOAL,
    payload: goal
  };
}

//TODO: will improve after figured out most efficient way for user data or if I need to use dummy data
export function fetchActivities() {
  let activities = axios
    .get(activitiesUrl, {
      params: {
        after: janFirstLastYear,
        before: janFirstThisYear,
        per_page: 200
      }
    })
    .then(object => {
      return object.data;
    });

  return {
    type: FETCH_ACTIVITIES,
    payload: activities
  };
}

export function fetchThisYear() {
  let thisYearsActivities = axios
    .get(activitiesUrl, {
      params: {
        after: janFirstThisYear,
        per_page: 200
      }
    })
    .then(object => {
      return object.data;
    });
  return {
    type: FETCH_THIS_YEAR,
    payload: thisYearsActivities
  };
}

export function fetchActivitiesPayload(activities) {
  return {
    type: FETCH_ACTIVITIES,
    payload: activities
  };
}

export function fetchActivitiesPayloadThisYear(activitiesThisYear) {
  return {
    type: FETCH_THIS_YEAR,
    payload: activitiesThisYear
  };
}

function fetchAuthorizationToken() {
  let GATEWAY_URL = [
    "https://pwgoqx1296.execute-api.us-east-1.amazonaws.com/beta/activities"
  ];
  let codeInUrl = new URL(window.location.href).searchParams.get("code");
  let codeInState = store.getState().code;
  let codeToUse = codeInUrl ? codeInUrl : codeInState; //TODO might be able to replace with fetchCode

  return (dispatch, getState) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 10);
    }).then(() => {
      return dispatch(cleanStore())
    })
    .then(() => {
      return fetch(GATEWAY_URL, {
      //lambda function
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
      code: codeToUse
    }),
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        crossDomain: true
      })
      })
      .then(response => {
        return response.json(); //puts into json object
      })
      .then(json => {
        return json.done.json;
      })
      .then(data => {
        console.log("response", data)
        return {type: FETCH_AUTHORIZATION_TOKEN, payload: data};
      });
    }

    /*ALMOST THERE JUST NEED TO NEED TO FIRE THIS OFF FETCH AS PAYLOAD.*/
}

export function fetchActivitiesWithCode() {
  //LAST YEAR FETCH_ACTIVITIES
  return (dispatch, getState) => {
    if (!getState().authorizationToken) {
      //TO DO: Put this in a if/else, but having issues with dispatch and promises defining a variable.  Revisit later.
      dispatch(fetchAuthorizationToken())
        .then(() => {
          let authorizationToken = getState().authorizationToken;
          let pageOne = axios.get(
            `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
            {
              params: {
                after: janFirstLastYear,
                before: janFirstThisYear,
                page: 1,
                per_page: 100
              }
            }
          );
          let pageTwo = axios.get(
            `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
            {
              params: {
                after: janFirstLastYear,
                before: janFirstThisYear,
                page: 2,
                per_page: 100
              }
            }
          );
          return Promise.all([pageOne, pageTwo]);
        })
        .then(object => {
          let pageOne = object[0].data;
          let pageTwo = object[1].data;
          return pageOne.concat(pageTwo);
        })
        .then(object => {
          return dispatch(fetchActivitiesPayload(object));
        });
    } else {
      (() => {
        let authorizationToken = getState().authorizationToken;
        let pageOne = axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
          {
            params: {
              after: janFirstLastYear,
              before: janFirstThisYear,
              page: 1,
              per_page: 100
            }
          }
        );
        let pageTwo = axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
          {
            params: {
              after: janFirstLastYear,
              before: janFirstThisYear,
              page: 2,
              per_page: 100
            }
          }
        );
        return Promise.all([pageOne, pageTwo]);
      })
        .then(object => {
          let pageOne = object[0].data;
          let pageTwo = object[1].data;
          return pageOne.concat(pageTwo);
        })
        .then(object => {
          return dispatch(fetchActivitiesPayload(object));
        });
    }
  };
}

export function fetchActivitiesWithCodeThisYear() {
  return (dispatch, getState) => {
    if (!getState().authorizationToken) {
      //TO DO: Put this in a if/else, but having issues with dispatch and promises defining a variable.  Revisit later.

      dispatch(fetchAuthorizationToken())
       .then(() => {
          let authorizationToken = getState().authorizationToken;
          let pageOne = axios.get(
            `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
            {
              params: {
                after: janFirstThisYear,
                page: 1,
                per_page: 200
              }
            }
          );
          let pageTwo = axios.get(
            `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
            {
              params: {
                after: janFirstThisYear,
                page: 2,
                per_page: 200
              }
            }
          );
          return Promise.all([pageOne, pageTwo]);
        })
        .then(object => {
          let pageOne = object[0].data;
          let pageTwo = object[1].data;
          return pageOne.concat(pageTwo);
        })
        .then(object => {
          return dispatch(fetchActivitiesPayloadThisYear(object));
        });
    } else {
      (() => {
        let authorizationToken = getState().authorizationToken;
        let pageOne = axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
          {
            params: {
              after: janFirstThisYear,
              page: 1,
              per_page: 200
            }
          }
        );
        let pageTwo = axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${authorizationToken}`,
          {
            params: {
              after: janFirstThisYear,
              page: 2,
              per_page: 200
            }
          }
        );
        return Promise.all([pageOne, pageTwo]);
      })
        .then(object => {
          let pageOne = object[0].data;
          let pageTwo = object[1].data;
          return pageOne.concat(pageTwo);
        })
        .then(object => {
          return dispatch(fetchActivitiesPayloadThisYear(object));
        });
    }
  };
}
export function cleanStore() {
  localStorage.clear();
  return {
    type: LOG_OUT
  };
}

export function fetchCode() {

  let code =
    new URL(window.location.href).searchParams.get("code") ||
    store.getState().code ||
    "no code";
  return {
    type: FETCH_CODE,
    payload: code
  };
}

/*
*
* curl -d '{"client_id":26984, "client_secret":"b865007db91e96ab678868f0d6b05cbc2bd9987b ","code":"288dfe8859a72e22bcbbd1204362d351c4b9eff8"}' -H "Content-Type: application/json" -X POST https://www.strava.com/oauth/token
*
* */
