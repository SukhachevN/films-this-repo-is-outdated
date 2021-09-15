import {
  ADD_TO_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
  INITIALIZE_WATCH_LATER,
} from "./watchLaterTypes";

const initialState = {
  idList: [],
  dataList: [],
};

const watchLaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_WATCH_LATER:
      return {
        idList: action.payload.idList,
        dataList: action.payload.dataList,
      };
    case ADD_TO_WATCH_LATER:
      return {
        idList: [...state.idList, action.payload.id],
        dataList: [...state.dataList, action.payload],
      };
    case REMOVE_FROM_WATCH_LATER:
      return {
        idList: state.idList.filter((id) => id !== action.payload.id),
        dataList: state.dataList.filter(
          (film) => film.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export { watchLaterReducer };
