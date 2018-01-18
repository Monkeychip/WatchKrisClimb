//export function from file, and import back to index, and pass app into that function
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); //going to the services file where you make strategies
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false} ); //if cookie, you'd put session true
//strava
const requireAuthStrava = passport.authenticate('strava', {scope: ['public' ]} );
const requireAuthStravaCallback = passport.authenticate('strava',{ failureRedirect: '/login' } );
const requireSignin = passport.authenticate('local', {session:false} );

module.exports = function(app){  //how you do exports in node

	app.get('/', function(req, res){
	  res.render('index', { user: req.user });
	});

	app.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});

	app.get('/login', function(req, res){
	  res.render('login', { user: req.user });
	});

	// Strava authentication

	app.get('/auth/strava',
	  passport.authenticate('strava', { scope: ['public'] }),
	  function(req, res){
	    // The request will be redirected to Strava for authentication, so this
	    // function will not be called.
	 });

	app.get('/auth/strava/callback', 
	  passport.authenticate('strava', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	 });

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}

}