import Immutable from "immutable";
import { explode } from "madera";

export default function logInReducer(action$) {
  let {
    init$,
    logIn$,
    logInSuccess$,
    logInFailure$,
    logOut$,
    loadProfileSuccess$
  } = explode(action$);

  return [
    [logOut$],
    state =>
      state.set(
        "user",
        Immutable.Map({
          profile: undefined,
          username: undefined,
          password: undefined,
          error: undefined
        })
      ),

    loadProfileSuccess$,
    (state, profile) => state.setIn(["user", "profile"], profile),

    logIn$,
    (state, { username, password }) =>
      state
        .setIn(["user", "username"], username)
        .setIn(["user", "password"], password),

    logInSuccess$,
    (state, profile) =>
      state
        .setIn(["user", "profile"], profile)
        .setIn(["user", "error"], undefined),

    logInFailure$,
    (state, { error } = { error: '' }) =>
      state
        .setIn(["user", "error"], error)
        .setIn(["user", "username"], "")
        .setIn(["user", "password"], "")
  ];
}
