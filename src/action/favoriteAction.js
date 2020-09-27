import { URL, GET_FAVORITE } from "./helper"
import Axios from "axios"

export const getFavorite = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(URL + `/favorite/get`)
            console.log(res.data)
            dispatch({ type: GET_FAVORITE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const getFavoriteByID = () => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/favorite/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_FAVORITE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const addFavorite = (body) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const add = await Axios.post(URL + `/favorite/add/${id}`, body)
            const res = await Axios.get(URL + `/favorite/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_FAVORITE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
export const deleteFavorite = (id_item) => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id')
            const delFav = await Axios.delete(URL + `/favorite/delete/${id_item}`)
            const res = await Axios.get(URL + `/favorite/get/${id}`)
            console.log(res.data)
            dispatch({ type: GET_FAVORITE, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}