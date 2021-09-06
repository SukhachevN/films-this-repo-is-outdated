import { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER } from "./watchLaterTypes"

const initialState = {
    idList:[],
    dataList:[]
}

const watchLaterReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_TO_WATCH_LATER:
            state={
                idList:[...state.idList,action.payload.id],
                dataList:[...state.dataList,action.payload]
            }
            return state;
        case REMOVE_FROM_WATCH_LATER:
            state={
                idList:state.idList.filter(id => id !== action.payload.id),
                dataList:state.dataList.filter(film => film.id !== action.payload.id)
            }
            return state
        default:
            return state
            //throw new Error(`unexpected action type ${action.type}`)
    }
}

export {watchLaterReducer}