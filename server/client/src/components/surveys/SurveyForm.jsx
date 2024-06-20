import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends React.Component {
	renderFields() {
		return FIELDS.map(({ label, name }, x) => (
			<Field key={x} label={label} name={name} component={SurveyField} />
		));
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link to={"/surveys"} className={"red btn-flat white-text"}>
						Cancel
					</Link>
					<button
						type={"submit"}
						className={"teal btn-flat right white-text"}
					>
						Next
						<i className={"material-icons right"}>done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || "");

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = "You must provide a value";
		}
	});
	return errors;
};

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);
