const mailgun = require("mailgun-js");
const keys = require("../config/keys");

class Mailer {
	constructor({ subject, recipients }, content) {
		this.mailgun = mailgun({
			apiKey: keys.mailgunKey,
			domain: keys.mailgunDomain
		});
		this.data = {
			from: "kshitijverma197@gmail.com",
			to: this.formatAddresses(recipients),
			subject,
			html: content
		};
	}
	formatAddresses(recipients) {
		return recipients.map(({ email }) => email).join(",");
	}
	async send() {
		return new Promise((resolve, reject) => {
			this.mailgun.messages().send(this.data, (error, body) => {
				if (error) {
					reject(error);
				} else {
					resolve(error);
				}
			});
		});
	}
}

module.exports = Mailer;
