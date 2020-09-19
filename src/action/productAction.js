import {GET_PRODUCT, GET_PRODUCT_DETAILS, GET_PRODUCT_CATEGORY, URL} from './helper'
import Axios from 'axios'

export const getProduct = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(URL + '/products')
            dispatch({type: GET_PRODUCT, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
} 

export const getProductDetails = (id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(URL + `/products/details/${id}`)
            dispatch({type: GET_PRODUCT_DETAILS, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getProductCategory = (category) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(URL + `/products/category`, {category})
            dispatch({type: GET_PRODUCT_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)    
        }
    }
}

export const addProduct = () => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}