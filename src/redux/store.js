import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { updateFavouriteLocalStorage } from "./favourite";
import { updateWatchLaterLocalStorage } from "./watchLater";
import { appMiddleware } from "./app";
import { rootReducer } from "./rootReducer";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    updateFavouriteLocalStorage,
    updateWatchLaterLocalStorage,
    appMiddleware
  )
);

export { store };
