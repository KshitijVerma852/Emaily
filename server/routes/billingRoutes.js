const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		const token = req.body.id;
		const charge = await stripe.charges.create({
			amount: 5000,
			currency: "usd",
			description: "$5 for 5 credits",
			source: token
		});
		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
