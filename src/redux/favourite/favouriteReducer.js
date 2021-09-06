import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./favouriteTypes"

const initialState = {
    idList:[],
    dataList:[]
}

const favouriteReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_TO_FAVOURITE:
            state={
                idList:[...state.idList,action.payload.id],
                dataList:[...state.dataList,action.payload]
            }
            return state;
        case REMOVE_FROM_FAVOURITE:
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

export {favouriteReducer}