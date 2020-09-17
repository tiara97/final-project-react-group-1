import {GET_CAROUSEL, URL} from "./helper"
import Axios from "axios"

export const getCarousel = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL)
            dispatch({type: GET_CAROUSEL, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)   
        }
    }
}