import { URL, GET_ADDRESS, ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS} from "./helper"
import Axios from "axios"

export const getAddress = (id) => {
    return async (dispatch) => {
        try {
            console.log('tes')
            const id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/address/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_ADDRESS, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const addAddress = (body) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const add = await Axios.post(URL + `/address/add/${id}`, body)
            console.log(add.data)
            const res = await Axios.get(URL + `/address/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_ADDRESS, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const editAddress = (body, id_address) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const edit = await Axios.patch(URL + `/address/edit/${id_address}`, body)
            const res = await Axios.get(URL + `/address/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_ADDRESS, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const deleteAddress = (id_address) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const del = await Axios.delete(URL + `/address/delete/${id_address}`)
            const res = await Axios.get(URL + `/address/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_ADDRESS, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
