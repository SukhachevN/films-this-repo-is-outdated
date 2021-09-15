import {
  ADD_TO_WATCH_LATER,
  INITIALIZE_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
} from "./watchLaterTypes";

const addToWatchLater = (film) => ({
  type: ADD_TO_WATCH_LATER,
  payload: film,
});

const removeFromWatchLater = (film) => ({
  type: REMOVE_FROM_WATCH_LATER,
  payload: film,
});

const initializeWatchLater = (data) => ({
  type: INITIALIZE_WATCH_LATER,
  payload: data,
});

export { addToWatchLater, removeFromWatchLater, initializeWatchLater };
