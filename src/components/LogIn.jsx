import { connectComponent, asActionType } from "madera";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "react-spinkit";

import Button from "./Button.jsx";

function FormLabel(props) {
  return (
    <label className="db ttu fw6 f6 pb2 pt3" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
}

export class LogIn extends React.Component {
  constructor(props, context) {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    this.props.onSubmit(this.state);
    event.preventDefault();
  }

  render() {
    const canSubmit =
      !this.props.isLoading && this.state.username && this.state.password;

    let submit = null;
    if (this.props.isLoading) {
      submit = (
        <div className="tc pt3">
          <Spinner name="line-scale" color="blue" />
        </div>
      );
    } else {
      submit = (
        <div className="tr pt3">
          <Button className="w-100 w-auto-ns" type="submit" disabled={!canSubmit}>
            Log in
          </Button>
        </div>
      );
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p className="tc light-red">
          {this.props.error}
        </p>
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h2 className="f4 pt2">Log in</h2>

        {errorMessage}

        <FormLabel htmlFor="username">Username</FormLabel>
        <input
          id="username"
          className="pa2 input-reset ba bg-transparent w-100"
          type="text"
          autoCapitalize="none"
          autoFocus
          value={this.state.username}
          onChange={this.onUsernameChange}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <input
          id="password"
          className="pa2 input-reset ba bg-transparent w-100 bb"
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />

        { submit }
      </form>
    );
  }
}

LogIn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

function isLoading(state) {
  return !!(
    state.getIn(["user", "username"]) &&
    state.getIn(["user", "password"]) &&
    !state.getIn(["user", "profile"])
  );
}

export default connectComponent(
  state$ => ({
    isLoading: state$.map(isLoading),
    error: state$.map(".getIn", ["user", "error"])
  }),
  () => ({
    onSubmit: asActionType("LOG_IN")
  })
)(LogIn);
