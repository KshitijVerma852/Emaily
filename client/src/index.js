import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App";
import reducers from "./reducers/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, {}, applyMiddleware());

root.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root
);
