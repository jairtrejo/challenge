import Immutable from "immutable";
import { explode } from "madera";

export default function favoriteThingsReducer(action$) {
  let { logOut$, addThing$, loadThingsSuccess$ } = explode(action$);

  return [
    addThing$,
    (state, thing) => {
      const things = state.get("things", Immutable.List());

      if (!things.includes(thing)) {
        return state.set("things", things.push(thing))
      } else {
        return state
      }
    },

    loadThingsSuccess$,
    (state, things) => state.set("things", things)
  ];
}
