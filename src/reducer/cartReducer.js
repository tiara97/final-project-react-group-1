import {GET_CART, GET_CART_END, CART_ERROR, GET_CART_START} from "../action"

const INITIAL_STATE={
    cart: [],
    total: 0,
    loading: false,
    error: null
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_CART_START:
            return{...state, loading: true}
        case GET_CART:
            return{...state, 
                cart: action.payload.cart? action.payload.cart : [], 
                total: action.payload.total? action.payload.total.total_price : 0 }
        case GET_CART_END:
            return{...state, loading: false}
        case CART_ERROR:
            return{...state, error: action.payload }
        default:
            return state
    }
}

export default cartReducer