const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const app = express();

passport.use(new GoogleStrategy());
// 'new GoogleStrategy(...)' creates a new instance of the Google Strategy
// 'passport.use()' meaning: use the passed in strategy

const PORT = process.env.PORT || 5000;
// meaning: in development environment we'll use port 5000
// and in production environment we'll use whatever port Heroku is attempting to provide to us
app.listen(PORT);