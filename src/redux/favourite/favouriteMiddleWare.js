import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./favouriteTypes";

function updateFavouriteLocalStorage({ getState }) {
  return (next) => (action) => {
    const returnValue = next(action);
    const { favourite } = getState();
    switch (action.type) {
      case ADD_TO_FAVOURITE:
        window.localStorage.setItem("favourite", JSON.stringify(favourite));
        break;
      case REMOVE_FROM_FAVOURITE:
        window.localStorage.setItem("favourite", JSON.stringify(favourite));
        break;
      default:
        break;
    }
    return returnValue;
  };
}

export { updateFavouriteLocalStorage };
