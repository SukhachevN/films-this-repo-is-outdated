import { combineReducers } from "redux";
import { favouriteReducer } from "./favourite/favouriteReducer";
import { watchLaterReducer } from "./watchLater/watchLaterReducer";
import { discoverReducer } from "./discover/discoverReducer";

const rootReducer = combineReducers({
    favourite: favouriteReducer,
    watchLater: watchLaterReducer,
    discover: discoverReducer
})

export {rootReducer}