
import {URL, GET_ORDER_ALL, GET_ORDER_ID, UPLOAD_PAYMENT_ERROR, GET_ORDER_USER, GET_ORDER_START, GET_ORDER_END, GET_ORDER,  } from "./helper"
import Axios from "axios"

export const getAllOrder = () =>{
    return async(dispatch)=>{
        try {
            const alamat = localStorage.getItem('role') == 1 ? '/orders/get' : `/orders/getByWarehouseID/${localStorage.getItem('wh_id')}`
            console.log(alamat)
            dispatch({type: GET_ORDER_START})
            const res = await Axios.get(URL + alamat)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// get order sesuai user ID
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
// UNTUK USER !! -> get order sesuai user ID dan status
export const getUserOrderByStatus = (body) =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.post(URL + `/orders/getByOrderUserIDStatus/${id}`, body)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// UNTUK ADMIN !! -> get order sesuai status
export const getOrderByStatus = (status_id) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const res = await Axios.get(URL + `/orders/getByOrderStatus/${status_id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// UNTUK ADMIN !! -> get order sesuai warehouse ID
export const getOrderByWarehouse = (wh_id) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const res = await Axios.get(URL + `/orders/getByWarehouseID/${wh_id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// UNTUK ADMIN !! -> get order sesuai warehouse ID dan status
export const getOrderByWarehouseStatus = (wh_id, body) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ORDER_START})
            const res = await Axios.post(URL + `/orders/getByWarehouseIDStatus/${wh_id}`, body)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// user confirm barang diterima
export const userOrderConfirm = (order) =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            dispatch({type: GET_ORDER_START})
            const confirm = await Axios.patch(URL + `/transaction/done/${order}`)
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
            dispatch({ type: UPLOAD_PAYMENT_ERROR, payload: null })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            dispatch({ type: UPLOAD_PAYMENT_ERROR, payload: error.response.data })
        }
    }
}
// admin konfirmasi struk pembayaran
export const confirmPayment = (order_number) =>{
    return async(dispatch)=>{
        try {
          dispatch({type: GET_ORDER_START})
            const checkout = await Axios.patch(URL + `/transaction/payment/${order_number}`)
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})
          
          dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// admin reject struk pembayaran jika tidak sesuai
export const rejectPayment = (order_number, body) =>{
    return async(dispatch)=>{
        try {
          dispatch({type: GET_ORDER_START})
            const checkout = await Axios.patch(URL + `/transaction/reject/${order_number}`, body)
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})
          
          dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// admin cancel order jika order blm dibayar melebihi batas waktu
export const cancelOrder = (order_number, body) =>{
    return async(dispatch)=>{
        try {
          dispatch({type: GET_ORDER_START})
            const checkout = await Axios.patch(URL + `/transaction/cancel/${order_number}`, body)
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})
          
            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// admin kirim barang ke user
export const sendOrder = (order_number, body) =>{
    return async(dispatch)=>{
        try {
          dispatch({type: GET_ORDER_START})
            const checkout = await Axios.patch(URL + `/transaction/send/${order_number}`, body)
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER, payload: res.data})
          
            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
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