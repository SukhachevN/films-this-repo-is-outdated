import { DISCOVER_REQUEST,DISCOVER_SUCCESS,DISCOVER_FAIL } from "./discoverTypes";

const initialState = {
    isLoading : false,
    films: null,
    errror:null
}

const discoverReducer = (state = initialState, action) => {
    switch(action.type){
        case DISCOVER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DISCOVER_SUCCESS:
            return {
                ...initialState,
                films: action.payload,
            } 
        case DISCOVER_FAIL:
            return {
                ...initialState,
                error: action.payload
            }
        default:
            return state     
    }
}

export {discoverReducer}