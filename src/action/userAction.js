import {URL, 
        LOG_IN, 
        LOG_IN_ERROR, 
        LOG_IN_START, 
        LOG_IN_END, 
        REGISTER_START, 
        REGISTER_END, 
        REGISTER, 
        REGISTER_ERROR, 
        VERIFY, 
        VERIFY_ERROR, 
        LOG_OUT, 
        GET_PROFILE,
        GET_USER,
        GET_USER_START,
        GET_USER_END} from "./helper"
import Axios from "axios"

export const userLogin = (body) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: LOG_IN_START})

            const res = await Axios.post(URL + `/users/login`, body)
            console.log(res.data)
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('role', res.data.role_id)
            localStorage.setItem('wh_id', res.data.wh_id)
            dispatch({type: LOG_IN, payload: res.data})

            dispatch({type: LOG_IN_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: LOG_IN_ERROR, payload: error.response.data})
        }
    }
}
export const userRegister = (body) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: REGISTER_START})

            const res = await Axios.post(URL + `/users/register`, body)
            console.log(res.data)
            dispatch({type: REGISTER, payload: res.data})

            dispatch({type: REGISTER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: REGISTER_ERROR, payload: error.response.data})
        }
    }
}
export const userVerify = (token) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + '/users/verification', {token})
            console.log(res.data)
            dispatch({type: VERIFY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: VERIFY_ERROR, payload: error.response.data})
        }
    }
}
export const userKeepLogin = () =>{
    return async(dispatch)=>{
        try {
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')
            const role = localStorage.getItem('role')
            const wh_id = localStorage.getItem('wh_id')
            const resUser = await Axios.post(URL + '/users/keepLogin', {token})
            const resProfile = await Axios.get(URL + `/profiles/get/${id}`)
            dispatch({ type : LOG_IN, payload : resUser.data })
            dispatch({ type: GET_PROFILE, payload: resProfile.data })
        } catch (error) {
            console.log(error.response? error.response.data : error)
            // jaga2 kalo error lgsg logout
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            dispatch({type: LOG_OUT})
        }
    }
}
export const userLogout = () => {
    return async(dispatch) => {
        try {
            await localStorage.clear()
            dispatch({type: LOG_OUT})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getUserAdmin = () => {
    return async(dispatch) =>{
        try {
            dispatch({type: GET_USER_START})

            const res = await Axios.get(URL + "/users/getAdmin")
            console.log(res.data)
            dispatch({type: GET_USER, payload: res.data})

            dispatch({type: GET_USER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUsersByQuery = (body) => {
    return async(dispatch) =>{
        try {
            dispatch({type: GET_USER_START})

            const res = await Axios.get(URL + "/users/getByQuery?" + body)
            console.log(res.data)
            dispatch({type: GET_USER, payload: res.data})

            dispatch({type: GET_USER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUserByRoleAdmin = (id) => {
    return async(dispatch) =>{
        try {
            dispatch({type: GET_USER_START})

            const res = await Axios.get(URL + "/users/getByRoleAdmin/"+id)
            console.log(res.data)
            dispatch({type: GET_USER, payload: res.data})

            dispatch({type: GET_USER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUserByStatusAdmin = (id) => {
    return async(dispatch) =>{
        try {
            dispatch({type: GET_USER_START})

            const res = await Axios.get(URL + "/users/getByStatusAdmin/"+id)
            console.log(res.data)
            dispatch({type: GET_USER, payload: res.data})

            dispatch({type: GET_USER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const editUser = (body,id) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_USER_START})

            await Axios.patch(URL + "/users/edit/" + id, body)
            const res = await Axios.get(URL + "/users/getAdmin")
            console.log(res.data)
            dispatch({type: GET_USER, payload: res.data})

            dispatch({type: GET_USER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
