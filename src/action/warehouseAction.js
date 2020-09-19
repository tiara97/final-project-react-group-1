import {URL, GET_WAREHOUSE, GET_WAREHOUSE_START, GET_WAREHOUSE_END} from "./helper"
import Axios from "axios"

export const getWarehouse = ()=>{
    return async(dispatch)=>{
        try {
            dispatch({type: GET_WAREHOUSE_START})

            const res = await Axios.get(URL + "/warehouse/get" )
            dispatch({type: GET_WAREHOUSE, payload: res.data})

            dispatch({type: GET_WAREHOUSE_END})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}