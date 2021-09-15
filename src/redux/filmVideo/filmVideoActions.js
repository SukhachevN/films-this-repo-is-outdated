import { api_key } from "../api_key";
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
  dispatch(fetchFilmVideoRequest());
  return window
    .fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}/videos?api_key=${api_key}`
    )
    .then(async (response) => {
      const video = await response.json();
      dispatch(fetchFilmVideoSuccess(video));
    })
    .catch((error) => {
      const errorMsg = Promise.reject(error);
      dispatch(fetchFilmVideoFail(errorMsg));
    });
};
