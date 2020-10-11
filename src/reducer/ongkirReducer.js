import {GET_ONGKIR, GET_ONGKIR_START, GET_ONGKIR_END} from "../action"

const INITIAL_STATE={
    ongkir:[],
    loading: false
}

const ongkirReducer = (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_ONGKIR:
            return {...state, ongkir: action.payload}
        case GET_ONGKIR_START:
            return {...state, loading: true}
        case GET_ONGKIR_END:
            return {...state, loading: false}
        default:
            return state
    }
}

export default ongkirReducer