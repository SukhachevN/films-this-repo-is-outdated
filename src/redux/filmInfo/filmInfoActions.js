import { api_key } from "../api_key";
import {
  FILM_INFO_FAIL,
  FILM_INFO_REQUEST,
  FILM_INFO_SUCCESS,
} from "./filmInfoTypes";

const fetchFilmInfoRequest = () => {
  return {
    type: FILM_INFO_REQUEST,
  };
};

const fetchFilmInfoSuccess = (info) => {
  return {
    type: FILM_INFO_SUCCESS,
    payload: info,
  };
};

const fetchFilmInfoFail = (error) => {
  return {
    type: FILM_INFO_FAIL,
    payload: error,
  };
};

export const fetchFilmInfo = (endpoint) => {
  return (dispatch) => {
    dispatch(fetchFilmInfoRequest());
    return window
      .fetch(
        `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}`
      )
      .then(async (response) => {
        const info = await response.json();
        dispatch(fetchFilmInfoSuccess(info));
      })
      .catch((error) => {
        const errorMsg = Promise.reject(error);
        dispatch(fetchFilmInfoFail(errorMsg));
      });
  };
};
