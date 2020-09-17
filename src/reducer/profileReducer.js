import { GET_PROFILE, GET_FAVORITE } from "../action"

const INITIAL_STATE = {
    profile: [],
    favorite: []
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, profile: action.payload }
        case GET_FAVORITE:
            return { ...state, favorite: action.payload }
        default:
            return state
    }
}

export default profileReducer