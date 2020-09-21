import {GET_WAREHOUSE, GET_WAREHOUSE_START, GET_WAREHOUSE_END} from "../action/helper"

const INITIAL_STATE ={
    warehouse: [],
    loading: false
}

const warehouseReducer = (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_WAREHOUSE:
            return{...state, warehouse: action.payload}
        case GET_WAREHOUSE_START:
            return{...state, loading: true}
        case GET_WAREHOUSE_END:
            return{...state, loading: false}
        default:
            return state
    }
}

export default warehouseReducer