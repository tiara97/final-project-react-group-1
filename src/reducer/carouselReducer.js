import {GET_CAROUSEL} from "../action/helper"

const INITIAL_STATE = {
    carousel: []
}

const carouselReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_CAROUSEL:
            return{...state, carousel: action.payload}
        default:
            return state
    }
}

export default carouselReducer