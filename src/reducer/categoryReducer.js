import {GET_CATEGORY, GET_CATEGORY_WAREHOUSE} from "../action"

const INITIAL_STATE ={
    category: [],
    categoryWarehouse: []
}

const categoryReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_CATEGORY:
            return{...state, category: action.payload}
        case GET_CATEGORY_WAREHOUSE:
            return{...state, categoryWarehouse: action.payload}
        default:
            return state
    }
}

export default categoryReducer