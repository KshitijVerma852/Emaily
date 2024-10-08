const keys = require("../../config/keys");

module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center"><h3>I'd like your input</h3>
					<p>Please answer the following question.</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/survey/${survey.id}/yes" o:tracking-clicks>Yes</a><br>
						<a href="${keys.redirectDomain}/api/survey/${survey.id}/no" o:tracking-clicks>No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
