import { api_key } from "../api_key";
import { fetchFilmsRequest } from "../fetchFilmsRequest";
import {
  FILM_VIDEO_FAIL,
  FILM_VIDEO_REQUEST,
  FILM_VIDEO_SUCCESS,
} from "./filmVideoTypes";

const fetchFilmVideoRequest = () => ({
  type: FILM_VIDEO_REQUEST,
});

const fetchFilmVideoSuccess = (video) => ({
  type: FILM_VIDEO_SUCCESS,
  payload: video,
});

const fetchFilmVideoFail = (error) => ({
  type: FILM_VIDEO_FAIL,
  payload: error,
});
export const fetchFilmVideo = (endpoint) => (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${endpoint}/videos?api_key=${api_key}`;
  return fetchFilmsRequest(
    dispatch,
    fetchFilmVideoRequest,
    link,
    fetchFilmVideoSuccess,
    fetchFilmVideoFail
  );
};
