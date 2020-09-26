import {
    URL,
    GET_PRODUCT_CATEGORY,
    FILTER_CATEGORY
} from './helper'
import Axios from 'axios'

export const getProductCategory = () => {
    return async (dispatch) => {
      try {
        const res = await Axios.get(URL + `/product-category`);
        dispatch({ type: GET_PRODUCT_CATEGORY, payload: res.data });
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };
};

export const getFilterProductCategory = (category) => {
    return async (dispatch) => {
      try {
        const res = await Axios.get(URL + `/product-category/filter/${category}`);
        dispatch({ type: FILTER_CATEGORY, payload: res.data });
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };
};

export const addProductCategory = (body) =>{
    return async(dispatch)=>{
        try {
            await Axios.post(URL + `/product-category/add`, body)

            // get product category
            const res = await Axios.get(URL + "/product-category")
            dispatch({type: GET_PRODUCT_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const editProductCategory = (product_id, body) =>{
    return async(dispatch)=>{
        try {
            await Axios.patch(URL + `/product-category/edit/${product_id}`, body)

            // get product category
            const res = await Axios.get(URL + "/product-category")
            dispatch({type: GET_PRODUCT_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const deleteProductCategory = (product_id) =>{
    return async(dispatch)=>{
        try {
            await Axios.delete(URL + `/product-category/delete/${product_id}`)

            // get product category
            const res = await Axios.get(URL + "/product-category")
            dispatch({type: GET_PRODUCT_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getProductCategoryByWarehouse = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + "/product-category")
            console.log(res.data)
            dispatch({type: GET_PRODUCT_CATEGORY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}