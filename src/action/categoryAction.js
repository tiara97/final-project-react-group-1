import {URL, GET_CATEGORY, GET_CATEGORY_WAREHOUSE} from "./helper"
import Axios from "axios"

export const getCategory = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + "/category/get")
            dispatch({type: GET_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getCategoryByWarehouse = (warehouse_id, admin_id) =>{
    return async(dispatch)=>{
        try {
            if(warehouse_id === 'All' || admin_id === 'All') return dispatch({ type: GET_CATEGORY_WAREHOUSE, payload: [] });

            const res = await Axios.get(URL + `/category/get/warehouse/${warehouse_id}/${admin_id}`)
            dispatch({type: GET_CATEGORY_WAREHOUSE, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const addCategory = (body) =>{
    return async(dispatch)=>{
        try {
            await Axios.post(URL + `/category/add`, body)

            // get category
            const res = await Axios.get(URL + "/category/get")
            dispatch({type: GET_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const editCategory = (category_id, body) =>{
    return async(dispatch)=>{
        try {
            await Axios.patch(URL + `/category/edit/${category_id}`, body)

            // get category
            const res = await Axios.get(URL + "/category/get")
            dispatch({type: GET_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const deleteCategory = (id) =>{
    return async(dispatch)=>{
        try {
            await Axios.delete(URL + `/category/delete/${id}`)

            // get category
            const res = await Axios.get(URL + "/category/get")
            dispatch({type: GET_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}