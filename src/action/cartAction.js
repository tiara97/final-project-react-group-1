import {URL, GET_CART, GET_CART_END, GET_CART_START} from "./helper"
import Axios from "axios"

export const getCart = (id)=>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_CART_START})

            const cart = await Axios.get(URL + "/cart/" + id)
            console.log(cart.data)
            dispatch({type: GET_CART, payload: cart.data })

            dispatch({type: GET_CART_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const deleteCart = (id, user_id) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_CART_START})

            const del = await Axios.delete(URL + "/cart/delete/" + id)
            const cart = await Axios.get(URL + "/cart/" + user_id)
            dispatch({type: GET_CART, payload: cart.data})

            dispatch({type: GET_CART_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const editCart = (id, body) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_CART_START})

            const edit = await Axios.patch(URL + "/cart/edit/" + id, body)
            const cart = await Axios.get(URL + "/cart/" + body.user_id)
            dispatch({type: GET_CART, payload: cart.data})

            dispatch({type: GET_CART_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}