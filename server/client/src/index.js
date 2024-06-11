import React from "react";
import ReactDOM from "react-dom/client";
import "materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App";
import axios from "axios";
window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
