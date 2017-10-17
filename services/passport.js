const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serializeUser is called when user logs in, or make a request, and we need to return a unique id as a cookie to the browser
// we turn the mongoose model instance into an 'id'
passport.serializeUser((user, done) => {
	// 'done' is a callback that we have to call after we have done some work with passport
	// we put 'null' for the error object, cos this is a very simple process and we never expect to be any errors here
	done(null, user.id); // 'user.id' here is what in mlab is the unique id of the record: '_id.$oid'
});

// deserializeUser is called when a user makes a new request with the cookie automatically include as a header,
// so the 'id' provided by the browser is trasfered to the particular user
// and we need to figure out which user is that based on the provided id
// we turn the 'id' into a mongoose model instance
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //meaning: if our request runs throug any proxy, that's tottaly fine, trust the proxy and calculate the callback url properly
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
