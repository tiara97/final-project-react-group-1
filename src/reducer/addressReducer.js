import {GET_ADDRESS} from "../action"

const INITIAL_STATE ={
    userAddress: []
}

const addressReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_ADDRESS:
            return{...state,userAddress: action.payload}
        default:
            return state
    }
}

export default addressReducer