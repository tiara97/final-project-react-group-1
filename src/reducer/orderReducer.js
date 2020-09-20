import { GET_ORDER_ALL, GET_ORDER_ID } from "../action"

const INITIAL_STATE = {
    order: []
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_ALL:
            return { ...state, order: action.payload }
        case GET_ORDER_ID:
            return { ...state, order: action.payload }
        default:
            return state
    }
}

export default orderReducer