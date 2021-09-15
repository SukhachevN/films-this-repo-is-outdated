import { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER } from "./watchLaterTypes";

function updateWatchLaterLocalStorage({ getState }) {
  return (next) => (action) => {
    const returnValue = next(action);
    const { watchLater } = getState();
    switch (action.type) {
      case ADD_TO_WATCH_LATER:
        window.localStorage.setItem("watchLater", JSON.stringify(watchLater));
        break;
      case REMOVE_FROM_WATCH_LATER:
        window.localStorage.setItem("watchLater", JSON.stringify(watchLater));
        break;
      default:
        break;
    }
    return returnValue;
  };
}

export { updateWatchLaterLocalStorage };
