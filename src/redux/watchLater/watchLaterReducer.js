import { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER } from "./watchLaterTypes";

const initial = JSON.parse(window.localStorage.getItem("watchLater"));

const initialState = {
  idList: initial?.idList ?? [],
  dataList: initial?.dataList ?? [],
};

const watchLaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WATCH_LATER:
      state = {
        idList: [...state.idList, action.payload.id],
        dataList: [...state.dataList, action.payload],
      };
      window.localStorage.setItem("watchLater", JSON.stringify(state));
      return state;
    case REMOVE_FROM_WATCH_LATER:
      state = {
        idList: state.idList.filter((id) => id !== action.payload.id),
        dataList: state.dataList.filter(
          (film) => film.id !== action.payload.id
        ),
      };
      window.localStorage.setItem("watchLater", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};

export { watchLaterReducer };
