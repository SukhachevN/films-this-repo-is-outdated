import { api_key } from "../api_key";
import { fetchFilmsRequest } from "../fetchFilmsRequest";
import {
  FILM_INFO_FAIL,
  FILM_INFO_REQUEST,
  FILM_INFO_SUCCESS,
} from "./filmInfoTypes";

const fetchFilmInfoRequest = () => ({
  type: FILM_INFO_REQUEST,
});

const fetchFilmInfoSuccess = (info) => ({
  type: FILM_INFO_SUCCESS,
  payload: info,
});

const fetchFilmInfoFail = (error) => ({
  type: FILM_INFO_FAIL,
  payload: error,
});

const fetchFilmInfo = (endpoint) => (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}`;
  return fetchFilmsRequest(
    dispatch,
    fetchFilmInfoRequest,
    link,
    fetchFilmInfoSuccess,
    fetchFilmInfoFail
  );
};

export { fetchFilmInfo };
