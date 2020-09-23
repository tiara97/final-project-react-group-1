import { GET_ADDRESS, LOG_OUT, EDIT_ADDRESS, DELETE_ADDRESS, ADD_ADDRESS } from '../action'

const INITIAL_STATE = {
    address: []
}

const addressReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ADDRESS:
            return { address: action.payload }
        case ADD_ADDRESS:
            return { address: action.payload }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default addressReducer