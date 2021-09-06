import { combineReducers } from "redux";
import { favouriteReducer } from "./favourite/favouriteReducer";
import { watchLaterReducer } from "./watchLater/watchLaterReducer";

const rootReducer = combineReducers({
    favourite: favouriteReducer,
    watchLater: watchLaterReducer
})

export {rootReducer}