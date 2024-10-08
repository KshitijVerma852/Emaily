const passport = require("passport");
const mongoose = require("mongoose");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: GithubStrategy } = require("passport-github2");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser(({ id }, done) => {
	done(null, id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GithubStrategy(
		{
			clientID: keys.githubClientId,
			clientSecret: keys.githubSecretKey,
			callbackURL: "/auth/github/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ githubId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			} else {
				const newUser = await User.create({ githubId: profile.id });
				return done(null, newUser);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			} else {
				const newUser = await User.create({ googleId: profile.id });
				return done(null, newUser);
			}
		}
	)
);
