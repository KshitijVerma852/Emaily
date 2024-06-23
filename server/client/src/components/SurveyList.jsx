import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurvey();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div key={survey.title} className={"card darken-1"}>
					<div className={"card-content"}>
						<span className={"card-title"}>{survey.title}</span>
						<p>{survey.body}</p>
						<p className={"right"}>
							Sent on: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className={"card-action"}>
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.renderSurveys()}
			</div>
		);
	}
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(mapStateToProps, actions)(SurveyList);
