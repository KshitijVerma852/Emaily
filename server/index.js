const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");

mongoose.connect(require("./config/keys").mongoURI)
	.then(() => {
		console.log("Connected to mongo!");
	});
const PORT = process.env.PORT || 5000;

const app = express();

require("./routes/authRoutes")(app);

app.listen(PORT, () => {
	console.log("App listening on port", PORT);
});
