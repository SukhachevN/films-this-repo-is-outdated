import {
  INITIALIZE_FAVOURITE,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "./favouriteTypes";

const favouriteKey = "favourite";

function updateFavouriteLocalStorage({ getState }) {
  return (next) => (action) => {
    const returnValue = next(action);
    const { favourite } = getState();
    const favoutiteStringified = JSON.stringify(favourite);
    switch (action.type) {
      case INITIALIZE_FAVOURITE:
        window.localStorage.setItem(favouriteKey, favoutiteStringified);
        break;
      case ADD_TO_FAVOURITE:
        window.localStorage.setItem(favouriteKey, favoutiteStringified);
        break;
      case REMOVE_FROM_FAVOURITE:
        window.localStorage.setItem(favouriteKey, favoutiteStringified);
        break;
      default:
        break;
    }
    return returnValue;
  };
}

export { updateFavouriteLocalStorage };
