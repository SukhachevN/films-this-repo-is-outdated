import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./favouriteTypes"

const addToFavourite = (film) => {
    return {
        type: ADD_TO_FAVOURITE,
        payload: film
    } 
}

const removeFromFavourite = (film) => {
    return {
        type: REMOVE_FROM_FAVOURITE,
        payload: film
    }
}

export {addToFavourite,removeFromFavourite}