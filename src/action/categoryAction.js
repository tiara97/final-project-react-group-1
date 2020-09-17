import {URL, GET_CATEGORY} from "./helper"
import Axios from "axios"

export const getCategory = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + "/category/get")
            console.log(res.data)
            dispatch({type: GET_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
