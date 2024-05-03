const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ worked: true });
});

app.listen(5000);
