import { combineReducers } from "redux";
import { favouriteReducer } from "./favourite";
import { watchLaterReducer } from "./watchLater";
import { discoverReducer } from "./discover";
import { filmInfoReducer } from "./filmInfo";
import { filmVideoReducer } from "./filmVideo";
import { appReducer } from "./app/appReducer";

const rootReducer = combineReducers({
  favourite: favouriteReducer,
  watchLater: watchLaterReducer,
  discover: discoverReducer,
  filmInfo: filmInfoReducer,
  filmVideo: filmVideoReducer,
  app: appReducer,
});

export { rootReducer };
