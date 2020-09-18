import {URL, GET_PROFILE, GET_FAVORITE} from "./helper"
import Axios from "axios"

export const getProfile = () =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/profiles/get/${id}`)
            console.log(res.data)
            dispatch({type: GET_PROFILE, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getFavorite = () =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/profiles/getFavorite/${id}`)
            console.log(res.data)
            dispatch({type: GET_FAVORITE, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}