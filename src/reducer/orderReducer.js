import { GET_ORDER, GET_ORDER_END, GET_ORDER_START,UPLOAD_PAYMENT_ERROR } from "../action"

const INITIAL_STATE = {
    loading: false,
    order: [],
    total: 0,
    errorUpload: null
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
        default:
            return state
    }
}

export default orderReducer