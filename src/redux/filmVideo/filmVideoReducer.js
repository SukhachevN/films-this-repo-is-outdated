import {
  FILM_VIDEO_FAIL,
  FILM_VIDEO_REQUEST,
  FILM_VIDEO_SUCCESS,
} from "./filmVideoTypes";

const initialState = {
  isLoading: false,
  video: null,
  error: null,
};

const filmVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILM_VIDEO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FILM_VIDEO_SUCCESS:
      return {
        ...initialState,
        video: action.payload,
      };
    case FILM_VIDEO_FAIL:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { filmVideoReducer };
