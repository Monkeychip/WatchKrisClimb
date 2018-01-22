//help us authenticate a user a route that requires authentication
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const StravaStrategy = require('passport-strava-oauth2').Strategy; //strava
const util = require('util'); //strava
const env = require('process-env');
const LocalStrategy = require('passport-local');


//STRAVA TESTING
var STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
var STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//Strava Strategy
const stravaLogin = new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Strava profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Strava account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
);


//TELL PASSPORT TO USE STRATEGY
//passport.use(jwtLogin); //should replace with stravaLogin, when ready.
passport.use(stravaLogin);
//passport.use(localLogin);

