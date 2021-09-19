import {
  ADD_TO_FAVOURITE,
  INITIALIZE_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "./favouriteTypes";

const initialState = {
  idList: [],
  dataList: [],
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_FAVOURITE:
      return {
        idList: action.payload.idList,
        dataList: action.payload.dataList,
      };
    case ADD_TO_FAVOURITE:
      return {
        idList: [...state.idList, action.payload.id],
        dataList: [...state.dataList, action.payload],
      };
    case REMOVE_FROM_FAVOURITE:
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

export { favouriteReducer };
