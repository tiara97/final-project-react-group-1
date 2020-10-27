import {URL, GET_ONGKIR, GET_ONGKIR_START, GET_ORDER_END} from "./helper"
import Axios from "axios"

export const getOngkir = () =>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_ONGKIR_START})

            const res = await Axios.get(URL + "/ongkir/get")
            dispatch({type: GET_ONGKIR, payload: res.data})

            dispatch({type: GET_ORDER_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
}
}