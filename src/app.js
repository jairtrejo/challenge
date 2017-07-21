import React from "react";
import ReactDOM from "react-dom";
import { Madera, rootComponent, explode } from "madera";

import logInReducer from "./reducers/login";
import favoriteThingsReducer from "./reducers/favoriteThings";
import User from "./resources/User";
import FavoriteThings from "./resources/FavoriteThings";
import App from "./components/App.jsx";

const context = Madera(
  [logInReducer, favoriteThingsReducer], // List of reducers
  [
    "INIT", // App has started
    "LOG_IN", // User requested a log in
    "LOG_IN_SUCCESS", // Log in was successful
    "LOG_IN_FAILURE", // Log in failed
    "LOG_OUT", // User requested a log out
    "LOAD_PROFILE_SUCCESS", // User's profile was loaded from local storage
    "ADD_THING", // User added a new favorite thing
    "LOAD_THINGS_SUCCESS" // User's favorite things were loaded from local storage
  ] // List of action types
);
const { action$, state$, init } = context;

const resources = [new User(context), new FavoriteThings(context)];

// Useful for debugging
state$.onValue(state => (window.state = state.toJS()));

const Root = rootComponent(action$, state$, init)(App);
ReactDOM.render(<Root />, document.getElementById("app"));
