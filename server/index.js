const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI)
	.then(() => {
		console.log("Connected to mongo!");
	});
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(PORT, () => {
	console.log("App listening on port", PORT);
});