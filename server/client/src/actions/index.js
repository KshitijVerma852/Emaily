import axios from "axios";
import * as actionTypes from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post("/api/stripe", token);
	dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const handleSurveyFormSubmit =
	(surveyData, history) => async dispatch => {
		const res = await axios.post("/api/survey", surveyData);
		history.push("/surveys");
		dispatch({
			type: actionTypes.FETCH_USER,
			payload: res.data
		});
	};

export const fetchSurvey = () => async dispatch => {
	const res = await axios.get("/api/survey");
	dispatch({
		type: actionTypes.FETCH_SURVEYS,
		payload: res.data
	});
};
