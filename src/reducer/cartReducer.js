import {GET_CART, GET_CART_END, CART_ERROR, GET_CART_START, ERROR_ONGKIR, } from "../action"

const INITIAL_STATE={
    cart: [],
    total: 0,
    loading: false,
    error: null,
    errorOngkir: null
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_CART_START:
            return{...state, loading: true}
        case GET_CART:
            return{...state, 
                cart: action.payload.cart? action.payload.cart : [], 
                total: action.payload.total? action.payload.total.total_price : 0, 
                error: null}
        case GET_CART_END:
            return{...state, loading: false}
        case CART_ERROR:
            return{...state, error: action.payload }
        case ERROR_ONGKIR:
            return{...state, errorOngkir: action.payload}
        default:
            return state
    }
}

export default cartReducer