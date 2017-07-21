import React from "react";
import { connectComponent, asActionType } from "madera";
import PropTypes from "prop-types";

import Button from "./Button.jsx";

export class FavoriteThings extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newThing: ''
    }

    this.onChangeThing = this.onChangeThing.bind(this);
    this.addThing = this.addThing.bind(this);
  }

  onChangeThing(event){
    this.setState({newThing: event.target.value});
  }

  addThing(event){
    this.props.addThing(this.state.newThing);
    this.setState({newThing: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2 className="dib v-mid f4 gray">
          {this.props.profile.name}'s favorite things
        </h2>
        <a
          href="#"
          className="db f6 dib-ns v-mid fr-ns mt3-ns"
          onClick={this.props.logOut}
        >
          Log out
        </a>
        <form className="cf tc" onSubmit={this.addThing}>
          <input
            onChange={this.onChangeThing}
            value={this.state.newThing}
            placeholder="e.g. whiskers on kittens"
            className="dib pa2 input-reset ba bg-transparent w5 v-mid"
            type="text"
          />
          <Button type="submit" className="dib v-mid mt3 ml2">Add thing</Button>
        </form>
        <ul className="pa0 pl2">
          { this.props.things.map(thing => <li key={thing}>{ thing }</li>) }
        </ul>
      </div>
    );
  }
}

FavoriteThings.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string
  }),
  things: PropTypes.array,
  logOut: PropTypes.func.isRequired,
  addThing: PropTypes.func.isRequired
}

export default connectComponent(
  state$ => ({
    profile: state$.map(".getIn", ["user", "profile"]).map(".toJS"),
    things: state$.map(".get", "things").map(things => things ? things.toJS() : [])
  }),
  () => ({
    logOut: asActionType("LOG_OUT"),
    addThing: asActionType("ADD_THING")
  })
)(FavoriteThings);
