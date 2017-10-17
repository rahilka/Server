const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// 'done' is a callback that we have to call after we have done some work with passport
	// we put 'null' for the error object, cos this is a very simple process and we never expect to be any errors here
	done(null, user.id); // 'user.id' here is what in mlab is the unique id of the record: '_id.$oid'
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we already have a record with the given profile id
					done(null, existingUser); //the first argument is 'error' object
				} else {
					// we'll make a new record
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
