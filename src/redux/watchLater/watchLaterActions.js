import {
  ADD_TO_WATCH_LATER,
  INITIALIZE_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
} from "./watchLaterTypes";

const addToWatchLater = (film) => {
  return {
    type: ADD_TO_WATCH_LATER,
    payload: film,
  };
};

const removeFromWatchLater = (film) => {
  return {
    type: REMOVE_FROM_WATCH_LATER,
    payload: film,
  };
};

const initializeWatchLater = (data) => {
  return {
    type: INITIALIZE_WATCH_LATER,
    payload: data,
  };
};

export { addToWatchLater, removeFromWatchLater, initializeWatchLater };
