import { appLoaded } from "./appActions";
import { LOAD_APP } from "./appTypes";

const emptyState = {
  dataList: [],
  idList: [],
};

const favoutiteKey = "favourite";
const watchLaterKey = "watchLater";

function appMiddleware(state) {
  return (next) => (action) => {
    const { dispatch } = state;
    switch (action.type) {
      case LOAD_APP: {
        const favouriteValue = window.localStorage.getItem(favoutiteKey);
        const watchLaterValue = window.localStorage.getItem(watchLaterKey);
        const favouriteParsed = JSON.parse(favouriteValue);
        const watchLaterParsed = JSON.parse(watchLaterValue);
        const favourite = favouriteParsed || emptyState;
        const watchLater = watchLaterParsed || emptyState;
        return dispatch(
          appLoaded({
            favourite: favourite,
            watchLater: watchLater,
          })
        );
      }
      default:
        return next(action);
    }
  };
}

export { appMiddleware };
