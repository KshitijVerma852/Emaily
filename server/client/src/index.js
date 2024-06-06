import React from "react";
import ReactDOM from "react-dom/client";
import "materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";

import App from "./components/App";

const store = createStore(reducers, {}, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_STRIPE_KEY);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
