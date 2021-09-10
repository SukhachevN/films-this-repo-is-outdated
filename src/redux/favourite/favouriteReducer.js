import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./favouriteTypes"

const initial = JSON.parse(window.localStorage.getItem('favourite'))

const initialState = {
    idList:initial?.idList ?? [],
    dataList:initial?.dataList ?? []
}

const favouriteReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_TO_FAVOURITE:
            state={
                idList:[...state.idList,action.payload.id],
                dataList:[...state.dataList,action.payload]
            }
            window.localStorage.setItem('favourite',JSON.stringify(state))
            return state;
        case REMOVE_FROM_FAVOURITE:
            state={
                idList:state.idList.filter(id => id !== action.payload.id),
                dataList:state.dataList.filter(film => film.id !== action.payload.id)
            }
            window.localStorage.setItem('favourite',JSON.stringify(state))
            return state
        default:
            return state
    }
}

export {favouriteReducer}