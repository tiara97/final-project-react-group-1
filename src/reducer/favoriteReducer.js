import { GET_FAVORITE, LOG_OUT } from "../action"

const INITIAL_STATE = {
    favorite: []
}

const favoriteReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FAVORITE:
            return { ...state, favorite: action.payload }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default favoriteReducer