import { appLoaded } from "./appActions";
import { LOAD_APP } from "./appTypes";

const emptyState = {
  dataList: [],
  idList: [],
};

function appMiddleware(state) {
  return (next) => (action) => {
    const returnValue = next(action);
    const { dispatch } = state;
    switch (action.type) {
      case LOAD_APP:
        const data = {
          favourite:
            JSON.parse(window.localStorage.getItem("favourite")) || emptyState,
          watchLater:
            JSON.parse(window.localStorage.getItem("watchLater")) || emptyState,
        };
        dispatch(appLoaded(data));
        break;
      default:
        break;
    }
    return returnValue;
  };
}

export { appMiddleware };
