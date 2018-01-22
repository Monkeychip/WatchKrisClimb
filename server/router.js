//export function from file, and import back to index, and pass app into that function
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); //going to the services file where you make strategies
const passport = require('passport');
const axios = require('axios');

const requireAuth = passport.authenticate('jwt', { session: false} ); //if cookie, you'd put session true
//strava

module.exports = function(app){  //how you do exports in node
/*Different views*/
/*app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
//	res.send({message : 'hi there'});
  res.render('login', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

*/


// Strava authentication
	app.get('/auth/strava',
	  passport.authenticate('strava', { scope: ['public'] }),
	  function(req, res){
	    // The request will be redirected to Strava for authentication, so this
	    // function will not be called.
	  });

	// GET /auth/strava/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/strava/callback', 
	  passport.authenticate('strava', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.send(req); 
	    console.log(req,"LISTEN TOO MEE!!!!");
	});

	/*app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});


	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}

	app.get('/getcode', function(req,res){
		axios.post('').then( response => {
			res.send(response)
		})
	})*/

}