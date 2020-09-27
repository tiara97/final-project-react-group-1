import { GET_TOP_PRODUCT } from "../action"

const INITIAL_STATE = {
    topProduct: []
}

const reportReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOP_PRODUCT:
            return { ...state, topProduct: action.payload }
        default:
            return state
    }
}

export default reportReducer