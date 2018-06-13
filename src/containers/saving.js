const axios = require('axios');
const util = require('util');

exports.handler = (event, context, callback) => {
    // done is called to send information back to frontend

    let done = (err, res) => {
        if (err) {
            callback(null,
                {
                    statusCode: 400,
                    body: JSON.stringify({
                        type: "error"
                    }),
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
                        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
        }else{
            callback(null,
                {
                    statusCode: 200,
                    body: JSON.stringify({
                        type: "success",
                        test: event,
                        done: res
                    }),
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
                        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
        }
    }


    let getAccessToken = (queryStringParameters) => {

        let parameters = {
            client_id: 21992,
            client_secret: '22664cc703cd3adbff5dea59fda7d2439d333931',
            code: '46c72abf1722de78d4737c4c1c74b78bcd9b5b45'
        };

        return axios.post('https://www.strava.com/oauth/token', parameters)
            .then((response) => {
                return response.data.access_token;
            })
            .then((json) => {
                console.log("made it here",json);
                done(null, {
                    json: json,
                    test: event
                });
            })
            .catch((error) => {
                done({
                    error: error
                });
            });
    };

    try {
        console.log(util.inspect(event.queryStringParameters, { showHidden: true, depth: null }),"meep");
        getAccessToken(event.queryStringParameters);
    } catch (error) {
        console.log("initialization error");
        done(error);
    }
};