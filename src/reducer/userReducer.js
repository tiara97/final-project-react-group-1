import { LOG_IN, LOG_IN_START, LOG_IN_END, REGISTER_START, REGISTER_END, REGISTER, LOG_IN_ERROR, REGISTER_ERROR, LOG_OUT } from "../action"

const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: null,
    status: null,
    errorLogin: '',
    errorReg: '',
    loadingLogin: false,
    loadingReg: false,
    token: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN_START:
            return { ...state, loadingLogin: true }
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
        case LOG_IN_END:
            return { ...state, loadingLogin: false }
        case LOG_IN_ERROR:
            return { ...state, errorLogin: action.payload, loadingLogin: false }
        case REGISTER_START:
            return { ...state, loadingRegister: true }
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
        case REGISTER_END:
            return { ...state, loadingRegister: false }
        case REGISTER_ERROR:
            return { ...state, errorReg: action.payload.errors, loadingRegister: false }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default userReducer