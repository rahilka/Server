const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); // on app startup create the model(schema), if does not exist
// const passportConfig = require('./services/passport'); Not necessary
require('./services/passport'); // because we do not return anything from that file

mongoose.connect('');

const app = express(keys.mongoURI);

require('./routes/authRoutes')(app); //We immediately invoke the function return from the authRoutes file
// !!! the authRoutes file returns a function
// the code above is the same as doing the next:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
// It's just that is not mandatory to create a variable for it !!!

const PORT = process.env.PORT || 5000;
// meaning: in development environment we'll use port 5000
// and in production environment we'll use whatever port Heroku is attempting to provide to us
app.listen(PORT);
