import { connectComponent } from "madera";
import PropTypes from "prop-types";
import React from "react";

import LogIn from "./LogIn.jsx";
import FavoriteThings from "./FavoriteThings.jsx";

export function App(props) {
  let content;
  if (props.profile) {
    content = <FavoriteThings />;
  } else {
    content = <LogIn />;
  }

  return (
    <div>
      {content}
    </div>
  );
}

App.propTypes = {
  profile: PropTypes.object
};

export default connectComponent(
  state$ => ({
    profile: state$.map(".getIn", ["user", "profile"])
  }),
  null
)(App);
