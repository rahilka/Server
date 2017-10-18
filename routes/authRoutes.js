const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout(); // this function is automatically attached to the req object by 'passport'
		res.send(req.user); // prove that the user is not signed in anymore
	});

	app.get('/api/current_user', (req, res) => {
		// immediately send the response = user
		res.send(req.user);
	});
};
