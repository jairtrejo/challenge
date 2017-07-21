import Bacon from "baconjs";
import Immutable from "immutable";

import { asActionType, connectResource, Resource } from "madera";

const LOCAL_STORAGE_KEY = "mx.jairtrejo.challenge.things";

export class FavoriteThings extends Resource {
  loadFromStorage() {
    const thingsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (thingsJSON) {
      return Promise.resolve(Immutable.List(JSON.parse(thingsJSON)));
    } else {
      return Promise.reject();
    }
  }

  saveToStorage(things) {
    if (things) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(things));
      return Promise.resolve(true);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return Promise.resolve(false);
    }
  }
}

export default connectResource(
  state$ => ({
    loadFromStorage: state$
      .map(".get", "things")
      .filter(things => !things || things.size === 0)
      .skipDuplicates()
      .map(".toJS"),

    saveToStorage: state$
      .map(".get", "things")
      .filter(things => !!things)
      .skipDuplicates()
      .map(".toJS")
  }),
  () => ({
    loadFromStorage: asActionType("LOAD_THINGS_SUCCESS"),
    saveToStorage: asActionType("SAVE_THINGS_SUCCESS")
  })
)(FavoriteThings);
