import { GET_ORDER_ALL, GET_ORDER_ID, UPLOAD_PAYMENT_ERROR, GET_ORDER_USER, GET_ORDER, GET_ORDER_END, GET_ORDER_START, ERROR_CHECKOUT } from "../action"

const INITIAL_STATE = {
    loading: false,
    order: [],
    total: 0,
    errorUpload: null,
    errorCheckout: null
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDER:
            return { ...state, order: action.payload }
        case GET_ORDER_START:
            return {...state, loading: true}
        case GET_ORDER_END:
            return {...state, loading: false}
        case UPLOAD_PAYMENT_ERROR:
                return{...state, errorUpload: action.payload}
        case ERROR_CHECKOUT:
                return{...state, errorCheckout: action.payload}
        default:
            return state
    }
}

export default orderReducer