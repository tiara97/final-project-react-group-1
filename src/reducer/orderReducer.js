import { GET_ORDER_ALL, GET_ORDER_ID,UPLOAD_PAYMENT_ERROR } from "../action"

const INITIAL_STATE = {
    order: [],
    total: 0,
    errorUpload: null
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_ALL:
            return { ...state, order: action.payload }
        case GET_ORDER_ID:
            return { ...state, order: action.payload}
        case UPLOAD_PAYMENT_ERROR:
                return{...state, errorUpload: action.payload}
        default:
            return state
    }
}

export default orderReducer