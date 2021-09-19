import {
  FILM_INFO_FAIL,
  FILM_INFO_REQUEST,
  FILM_INFO_SUCCESS,
} from "./filmInfoTypes";

const initialState = {
  isLoading: false,
  info: null,
  error: null,
};

const filmInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILM_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FILM_INFO_SUCCESS:
      return {
        ...initialState,
        info: action.payload,
      };
    case FILM_INFO_FAIL:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { filmInfoReducer };
