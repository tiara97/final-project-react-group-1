import { LOG_IN, REGISTER, LOG_IN_ERROR, REGISTER_ERROR } from "../action"

const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: null,
    status: null,
    errorLogin: '',
    errorReg: '',
    token: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role_id,
                status: action.payload.status_id,
                token: action.payload.token
            }
        case LOG_IN_ERROR:
            return { ...state, errorLogin: action.payload }
        case REGISTER:
            return { 
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role_id,
                status: action.payload.status_id,
                token: action.payload.token
            }
        case REGISTER_ERROR:
            return { ...state, errorReg: action.payload.errors }
        default:
            return state
    }
}

export default userReducer