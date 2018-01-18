//telling mongoose what a model is.  
/*const mongoose = require('mongoose');
const Schema = mongoose.Schema; // pulling schema off mongoose; it's what we use to tell mongoose about particular fields
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
	email: { type: String, unique: true}, //references js String, not a variable just the type string
	password: String //both of these need to be unique, e.g. forcing uniqueness
});

//On Save Hook, encrypt password with bcrypt
//before a model run this function e.g. pre saving, hook of sorts
userSchema.pre('save', function(next){
	const user = this; //getting access to the user model; instance of user model

	//generate a salt, then run callback
	bcrypt.genSalt(10, function(err,salt){
		if(err) {return next(err); }

		//hash (encrypt) password using the salt, then pass callback
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) {return next(err); }

			// overwrite plain text with encrypted password
			user.password = hash;
			//go ahead and save the model
			next();
		});
	});
});

//to compare inputed passwords
userSchema.methods.comparePassword = function(candidatePassword,callback){
	bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
		if(err){ return callback(err); }

		callback(null, isMatch);
	}); //this.password is hashed and salted password
}

//Create model class
// make use of mongoose -> actually create new users
const ModelClass = mongoose.model('user', userSchema); //loads schema into mongoose coorspoinding to user -> all users, a class of users

//export the model
module.exports = ModelClass;*/