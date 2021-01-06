import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./router/AppRouter";
import "../sass/app.scss";

/**
 * Index Component: loads State Provider and App Router,
 * and then attacts App to DOM
 */
function Index() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
