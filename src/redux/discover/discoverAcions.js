import { DISCOVER_REQUEST,DISCOVER_SUCCESS,DISCOVER_FAIL } from "./discoverTypes";
import { api_key } from "../api_key";
import { GET_DISCOVER, GET_FILM_INFO, GET_FILM_TRAILERS, GET_SEARCH_FILMS } from "./discoverSearchTypes";

const fetchDiscoverRequest =  () => {
    return {
        type: DISCOVER_REQUEST
    }
} 

const fetchDiscoverSuccess = films => {
    return {
        type: DISCOVER_SUCCESS,
        payload:films
    }
}

const fetchDiscoverFail = error => {
    return {
        type: DISCOVER_FAIL,
        payload: error
    }
}

export const fetchDiscover = (endpoint,type) => {
    let link
    switch (type) {
        case GET_DISCOVER:
            link = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}${endpoint}`
            break;
        case GET_SEARCH_FILMS:
            link = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}${endpoint}`
            break;
        case GET_FILM_INFO:
            link = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}`
            break;
        case GET_FILM_TRAILERS:
            link = `https://api.themoviedb.org/3/movie/${endpoint}/videos?api_key=${api_key}`
            break;
        default:
            throw new Error(`Unsupported fetch type ${type}`);
    }
    return (dispatch) => {
        dispatch(fetchDiscoverRequest)
        return window.fetch(link)
        .then(async response => {
            const films = await response.json()
            dispatch(fetchDiscoverSuccess(films))
        })
        .catch(error => {
            const errorMsg = Promise.reject(error)
            dispatch(fetchDiscoverFail(errorMsg))
        })
    }
}
