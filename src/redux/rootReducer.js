import { combineReducers } from "redux";
import { favouriteReducer } from "./favourite/favouriteReducer";
import { watchLaterReducer } from "./watchLater/watchLaterReducer";
import { discoverReducer } from "./discover/discoverReducer";
import { filmInfoReducer } from "./filmInfo/filmInfoReducer";
import { filmVideoReducer } from "./filmVideo/filmVideoReducer";

const rootReducer = combineReducers({
  favourite: favouriteReducer,
  watchLater: watchLaterReducer,
  discover: discoverReducer,
  filmInfo: filmInfoReducer,
  filmVideo: filmVideoReducer,
});

export { rootReducer };
