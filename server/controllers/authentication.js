const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config'); //grabs the config.js with your secret
//installing bcyrpt to encrpypt passwords

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); //user id to secret, could be anything.  JWT is a standard, and have sub properyt called subject (sub). iat = issued at time
}

exports.signin = function(req,res,next){
	//user has already email and password auth, just need to give them a token
	//get access to current user model -> done callback on passport req.user
	res.send({ token: tokenForUser(req.user) });
}


//pull in request/respons object and then respond to it.
exports.signup = function(req,res,next){
	//return data from the post 
	const email = req.body.email;
	const password = req.body.password; 
	//see if user with given email exists (User represents all users). 

//if no email or password
	if( !email || !password){
		return res.status(422).send({error: 'you must provide an email and password'})
	}

	User.findOne({ email: email }, function(err, existingUser) {
		if (err) { return next(err); }
		//if user does DOES exist, return email in use
		if (existingUser) { 
			return res.status(422).send({ error: 'Email is in use'}); //status to http, e.g. 422 couldn't process http code
		}
		//if a user with email does NOT exisit, create new user and save record
		const user = new User({ //creates but does not save
			email: email,
			password: password
		});
		user.save(function(err){ // this saves record to db, which takes a moment.  Pass callback to know when
			if(err){ return next(err); }
			//respond to request indicating user was created
			res.json({token: tokenForUser(user)});
		}); 
	});

	//respond to request indicating the user was created
}

