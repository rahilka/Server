const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("accessToken: ", accessToken);
			console.log("refreshToken: ", refreshToken);
			console.log("profile: ", profile);
		}
	)
);

app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;
// meaning: in development environment we'll use port 5000
// and in production environment we'll use whatever port Heroku is attempting to provide to us
app.listen(PORT);
