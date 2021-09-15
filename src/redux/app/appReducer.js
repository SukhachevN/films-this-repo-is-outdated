import { LOAD_APP, APP_LOADED } from "./appTypes";

const initialState = {
  loading: false,
  initialized: false,
  favoutite: {
    dataList: [],
    idList: [],
  },
  watchLater: {
    dataList: [],
    idList: [],
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_APP:
      return {
        ...initialState,
        loading: true,
      };
    case APP_LOADED:
      return {
        loading: false,
        initialized: true,
        favourite: {
          dataList: action.payload.favourite.dataList,
          idList: action.payload.favourite.idList,
        },
        watchLater: {
          dataList: action.payload.watchLater.dataList,
          idList: action.payload.watchLater.idList,
        },
      };

    default:
      return state;
  }
};

export { appReducer };
