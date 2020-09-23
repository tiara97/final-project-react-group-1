import {URL, GET_ORDER_ALL, GET_ORDER_USER } from "./helper"
import Axios from "axios"

export const getAllOrder = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER_ALL, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUserOrder = () =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByUserID/${id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER_USER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// UNTUK USER !!
export const getUserOrderByStatus = (body) =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByOrderUserIDStatus/${id}`, body)
            console.log(res.data)
            dispatch({type: GET_ORDER_USER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}