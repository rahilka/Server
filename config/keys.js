// keys.js - figure out what set of credentials to return

// when the app is running on Heroku, 'process.env.NODE_ENV' will automatically be set to 'production' 
if (process.env.NODE_ENV === 'production') {
	// we are in production = return the prod set of keys
	module.exports = require('./prod');
} else {
	// we are in development = return the dev.js keys
	module.exports = require('./dev'); // importing and exporting
}


/*
979321632458-vjr6t06n0ghshbn8r3559dgmml9j0bjq.apps.googleusercontent.com
BLZCRWvdUZ9gUPKiitXzeuFJ