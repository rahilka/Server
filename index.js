const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // on app startup create the model(schema), if does not exist
// const passportConfig = require('./services/passport'); Not necessary
require('./models/Survey');
require('./services/passport'); // because we do not return anything from that file

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //We immediately invoke the function return from the authRoutes file
// !!! the authRoutes file returns a function
// the code above is the same as doing the next:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
// It's just that is not mandatory to create a variable for it !!!
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Heroku automatically sets the NODE_ENV variable to 'production' when deployed
if (process.env.NODE_ENV === 'production') {
	// make sure that Express will serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
	}); //return the index.html file when all other conditions are not completed
}

const PORT = process.env.PORT || 5000;
// meaning: in development environment we'll use port 5000
// and in production environment we'll use whatever port Heroku is attempting to provide to us
app.listen(PORT);
