import {
  ADD_TO_FAVOURITE,
  INITIALIZE_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "./favouriteTypes";

const addToFavourite = (film) => ({
  type: ADD_TO_FAVOURITE,
  payload: film,
});

const removeFromFavourite = (film) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: film,
});

const initializeFavourite = (data) => ({
  type: INITIALIZE_FAVOURITE,
  payload: data,
});

export { addToFavourite, removeFromFavourite, initializeFavourite };
