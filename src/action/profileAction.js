import { URL, GET_PROFILE, GET_FAVORITE, UPLOAD_PIC_ERROR } from "./helper"
import Axios from "axios"

export const getProfile = () => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/profiles/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_PROFILE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const getFavorite = () => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/profiles/getFavorite/${id}`)
            console.log(res.data)
            dispatch({ type: GET_FAVORITE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const uploadPic = (data) => {
    return async (dispatch) => {
        const option = {
            header: {
                'Content-type': 'multipart/form-data'
            }
        }
        const id = localStorage.getItem('id')
        try {
            const upload = await Axios.post(URL + `/profiles/upload/${id}`, data, option)
            const res = await Axios.get(URL + `/profiles/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_PROFILE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            dispatch({ type: UPLOAD_PIC_ERROR, payload: error.response.data })
        }
    }
}