const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");

module.exports = app => {
	app.get("/api/survey/thanks", (req, res) => {
		res.send("Thank you very much for voting!");
	});
	app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(",")
				.map(email => ({ email: email.trim() })),
			user: req.user.id,
			dateSent: Date.now()
		});
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.post("/api/survey/webhooks", (req, res) => {
		const p = new Path("/api/survey/:surveyId/:choice");
		_.chain(req.body)
			.map(({ url, recipient }) => {
				if (url) {
					const match = p.test(new URL(url).pathname);
					return match
						? {
								email: recipient,
								surveyId: match.surveyId,
								choice: match.choice
							}
						: {};
				}
			})
			.compact()
			.uniqWith(
				(a, b) => a.email === b.email && a.surveyId === b.surveyId
			)
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();
		res.send({});
	});
};
