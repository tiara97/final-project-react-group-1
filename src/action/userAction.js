import {URL, LOG_IN, LOG_IN_ERROR, REGISTER, REGISTER_ERROR} from "./helper"
import Axios from "axios"

export const userLogin = (body) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + `/users/login`, body)
            console.log(res.data)
            dispatch({type: LOG_IN, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: LOG_IN_ERROR, payload: error.response.data})
        }
    }
}
export const userRegister = (body) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + `/users/register`, body)
            console.log(res.data)
            dispatch({type: REGISTER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: REGISTER_ERROR, payload: error.response.data})
        }
    }
}