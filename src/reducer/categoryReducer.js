import {GET_CATEGORY} from "../action"

const INITIAL_STATE ={
    category: []
}

const categoryReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_CATEGORY:
            return{...state, category: action.payload}
        default:
            return state
    }
}

export default categoryReducer