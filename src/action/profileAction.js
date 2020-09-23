import { URL, GET_PROFILE, UPLOAD_PIC_ERROR, LOG_OUT } from "./helper"
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
export const editProfile = (body) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const edit = await Axios.patch(URL + `/profiles/edit/${id}`, body)
            const res = await Axios.get(URL + `/profiles/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_PROFILE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const addMainAddress = (body) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const add = await Axios.patch(URL + `/profiles/addAddress/${id}`, body)
            const res = await Axios.get(URL + `/profiles/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_PROFILE, payload: res.data })
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
// export const userLogout = () => {
//     return async(dispatch) => {
//         try {
//             await localStorage.clear()
//             dispatch({type: LOG_OUT})
//         } catch (error) {
//             console.log(error.response? error.response.data : error)
//         }
//     }
// }