import {URL, GET_ORDER, GET_ORDER_ID, UPLOAD_PAYMENT_ERROR, GET_ORDER_START, GET_ORDER_END } from "./helper"
import Axios from "axios"

export const getAllOrder = () =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUserOrder = () =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByUserID/${id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getOrderByNumber = (order_number) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const res = await Axios.get(URL + "/orders/getByOrderNumber/" + order_number)
            console.log(res.data)
            console.log( `${URL}/orders/getByOrderNumber/${order_number}`)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const checkoutAction = (order_number) =>{
    return async(dispatch)=>{
        try {
            const checkout = await Axios.patch(URL + "/transaction/checkout/" + order_number)
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const uploadPayment = (order_number,data) => {
    return async (dispatch) => {
        const option = {
            header: {
                'Content-type': 'multipart/form-data'
            }
        }
        try {
            const upload = await Axios.post(URL + `/transaction/payment/upload/${order_number}`, data, option)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            dispatch({ type: UPLOAD_PAYMENT_ERROR, payload: error.response.data })
        }
    }
}

export const confirmDone = (order_number) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const confirm = await Axios.patch(URL + `/transaction/done/${order_number}`)
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByUserID/${id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response ? error.response.data : error)
                dispatch({ type: UPLOAD_PAYMENT_ERROR, payload: error.response.data })
        }
    }
}