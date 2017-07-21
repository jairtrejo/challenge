import Immutable from "immutable";

import { asActionType, connectResource, Resource } from "madera";

// Sleep function from https://gist.github.com/joepie91/2664c85a744e6bd0629c
function sleep(duration) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(...args);
      }, duration);
    });
  };
}

const LOCAL_STORAGE_KEY = "mx.jairtrejo.challenge.profile";

export class User extends Resource {
  logIn({ username, password }) {
    // Fake log in
    if (username == "jrullman" && password == "Testing1") {
      const profileData = { name: "Jennifer" };
      return Promise.resolve(Immutable.Map(profileData)).then(sleep(2000));
    } else {
      return Promise.reject({ error: "Wrong username or password" });
    }
  }

  loadProfile() {
    const profileJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (profileJSON) {
      return Promise.resolve(Immutable.Map(JSON.parse(profileJSON)));
    } else {
      return Promise.reject();
    }
  }

  saveProfile(profile) {
    if (profile) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile.toJS()));
      return Promise.resolve(true);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return Promise.resolve(false);
    }
  }
}

function needsLogin(user) {
  return (
    user && user.get("username") && user.get("password") && !user.get("profile")
  );
}

function needsLoading(user) {
  return !user;
}

export default connectResource(
  state$ => ({
    logIn: state$
      .map(".get", "user")
      .skipDuplicates()
      .filter(needsLogin)
      .map(".toJS"),

    loadProfile: state$.map(".get", "user").skipDuplicates().filter(needsLoading),

    saveProfile: state$.map(".getIn", ["user", "profile"]).skipDuplicates()
  }),
  () => ({
    logIn: asActionType("LOG_IN_SUCCESS", "LOG_IN_FAILURE"),
    loadProfile: asActionType("LOAD_PROFILE_SUCCESS"),
    saveProfile: asActionType("SAVE_PROFILE_SUCCESS")
  })
)(User);
