import {
  ADD_TO_WATCH_LATER,
  INITIALIZE_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
} from "./watchLaterTypes";

const watchLaterKey = "watchLater";

function updateWatchLaterLocalStorage({ getState }) {
  return (next) => (action) => {
    const returnValue = next(action);
    const { watchLater } = getState();
    const watchLaterStringified = JSON.stringify(watchLater);
    switch (action.type) {
      case INITIALIZE_WATCH_LATER:
        window.localStorage.setItem(watchLaterKey, watchLaterStringified);
        break;
      case ADD_TO_WATCH_LATER:
        window.localStorage.setItem(watchLaterKey, watchLaterStringified);
        break;
      case REMOVE_FROM_WATCH_LATER:
        window.localStorage.setItem(watchLaterKey, watchLaterStringified);
        break;
      default:
        break;
    }
    return returnValue;
  };
}

export { updateWatchLaterLocalStorage };
