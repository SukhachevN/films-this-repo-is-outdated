import {
  DISCOVER_REQUEST,
  DISCOVER_SUCCESS,
  DISCOVER_FAIL,
  GET_DISCOVER,
  GET_SEARCH_FILMS,
} from "./discoverTypes";
import { api_key } from "../api_key";
const fetchDiscoverRequest = () => {
  return {
    type: DISCOVER_REQUEST,
  };
};

const fetchDiscoverSuccess = (films) => {
  return {
    type: DISCOVER_SUCCESS,
    payload: films,
  };
};

const fetchDiscoverFail = (error) => {
  return {
    type: DISCOVER_FAIL,
    payload: error,
  };
};

export const fetchDiscover = (endpoint, type) => {
  let link;
  switch (type) {
    case GET_DISCOVER:
      link = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}${endpoint}`;
      break;
    case GET_SEARCH_FILMS:
      link = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}${endpoint}`;
      break;
    default:
      throw new Error(`Unsupported fetch type ${type}`);
  }
  return (dispatch) => {
    dispatch(fetchDiscoverRequest());
    return window
      .fetch(link)
      .then(async (response) => {
        const films = await response.json();
        dispatch(fetchDiscoverSuccess(films));
      })
      .catch((error) => {
        const errorMsg = Promise.reject(error);
        dispatch(fetchDiscoverFail(errorMsg));
      });
  };
};
