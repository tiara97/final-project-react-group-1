import {
  URL,
  GET_PRODUCT,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_TABLE,
  GET_PRODUCT_START,
  GET_PRODUCT_END,
  GET_PRODUCT_COLOR,
  GET_PRODUCT_WAREHOUSE, 
  ADD_PRODUCT_ERROR, 
  ADD_PRODUCT_START,
  ADD_PRODUCT_END
} from "./helper";
import Axios from "axios";

export const getProduct = (type, sort = '') => {
  return async (dispatch) => {
    try {
      dispatch({type: GET_PRODUCT_START})

      let router = ''
      if(sort){
        router = `/products/get/${type}?${sort}`
      } else {
        router = `/products/get/${type}`
      }

      // get product
      const res = await Axios.get(URL + router);
      dispatch({ type: GET_PRODUCT, payload: res.data });

      dispatch({type: GET_PRODUCT_END})
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const getProductColor = () => {
  return async (dispatch) => {
    try {
      const res = await Axios.get(URL + `/products/table/product_color`);
      dispatch({ type: GET_PRODUCT_COLOR, payload: res.data });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const getProductByTable = (type) => {
  return async (dispatch) => {
    try {
      const res = await Axios.get(URL + `/products/table/${type}`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res.data });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      const res = await Axios.get(URL + `/products/details/${id}`);
      dispatch({ type: GET_PRODUCT_DETAILS, payload: res.data });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const getProductWarehouse = (warehouse_id, admin_id) => {
  return async (dispatch) => {
    try {
      if(warehouse_id === 'All' || admin_id === 'All') return dispatch({ type: GET_PRODUCT_WAREHOUSE, payload: [] });

      const res = await Axios.get(URL + `/products/warehouse/${warehouse_id}/${admin_id}`);
      dispatch({ type: GET_PRODUCT_WAREHOUSE, payload: res.data });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const addProduct = (body) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_PRODUCT_START})

      await Axios.post(URL + "/products/add", body)
      const res = await Axios.get(URL + "/products/get/only_product")
      dispatch({type: GET_PRODUCT, payload: res.data})

      dispatch({type: ADD_PRODUCT_END})
    } catch (error) {
      dispatch({type: ADD_PRODUCT_ERROR, payload: error.response.data})
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const addProductColor = (body) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_PRODUCT_START})

      await Axios.post(URL + "/products/add/color", body)
      const res = await Axios.get(URL + "/products/table/product_color")
      dispatch({type: GET_PRODUCT_TABLE, payload: res.data})

      dispatch({type: ADD_PRODUCT_END})
    } catch (error) {
      dispatch({type: ADD_PRODUCT_ERROR, payload: error.response.data})
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const addProductImage = (body) => {
  return async (dispatch) => {
    try {
      dispatch({type: GET_PRODUCT_START})

      await Axios.post(URL + "/products/add/image", body)

      // get product
      const res1 = await Axios.get(URL + `/products/get/product_img_group`);
      dispatch({ type: GET_PRODUCT, payload: res1.data });
      const res2 = await Axios.get(URL + `/products/table/product_image`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });

      dispatch({type: GET_PRODUCT_END})
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const addProductStock = (body) => {
  return async (dispatch) => {
    try {
      dispatch({type: GET_PRODUCT_START})

      await Axios.post(URL + "/products/add/stock", body)

      // get product
      const res1 = await Axios.get(URL + `/products/get/product_details`);
      dispatch({ type: GET_PRODUCT, payload: res1.data });
      const res2 = await Axios.get(URL + `/products/table/product_stock`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });

      dispatch({type: GET_PRODUCT_END})
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      dispatch({type: ADD_PRODUCT_ERROR, payload: error.response.data})
    }
  };
};

export const editProduct = (product_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_START });
      // edit product
      await Axios.patch(URL + `/products/edit/${product_id}`, body);

      // get product
      const res = await Axios.get(URL + `/products/get/only_product`);
      dispatch({ type: GET_PRODUCT, payload: res.data });

      dispatch({ type: GET_PRODUCT_END });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const editProductColor = (color_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_START });
      // edit product
      await Axios.patch(URL + `/products/edit/color/${color_id}`, body);

      // get product
      const res = await Axios.get(URL + `/products/table/product_color`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res.data });

      dispatch({ type: GET_PRODUCT_END });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const editProductImage = (product_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_START });
      // edit product
      await Axios.patch(URL + `/products/edit/image/${product_id}`, body);

      // get product
      const res1 = await Axios.get(URL + `/products/get/product_img_group`);
      dispatch({ type: GET_PRODUCT, payload: res1.data });
      const res2 = await Axios.get(URL + `/products/table/product_image`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });

      dispatch({ type: GET_PRODUCT_END });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };
};

export const editProductStock = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_START });
      // edit product
      await Axios.patch(URL + `/products/edit/stock/${id}`, body);

      // get product
      const res1 = await Axios.get(URL + `/products/get/product_details`);
      dispatch({ type: GET_PRODUCT, payload: res1.data });
      const res2 = await Axios.get(URL + `/products/table/product_stock`);
      dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });

      dispatch({ type: GET_PRODUCT_END });
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
};
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_START });

            // delete product
            await Axios.delete(URL + `/products/delete/${id}`);
      
            // get product
            const res = await Axios.get(URL + "/products/get/only_product")
            dispatch({type: GET_PRODUCT, payload: res.data})
      
            dispatch({ type: GET_PRODUCT_END });
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    }
}

export const deleteProductColor = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_START });

            // delete product
            await Axios.delete(URL + `/products/delete/color/${id}`);
      
            // get product
            const res = await Axios.get(URL + "/products/table/product_color")
            dispatch({type: GET_PRODUCT_TABLE, payload: res.data})
      
            dispatch({ type: GET_PRODUCT_END });
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    }
}

export const deleteProductImage = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_START });

            // delete product
            await Axios.delete(URL + `/products/delete/image/${id}`);
      
            // get product
            const res1 = await Axios.get(URL + `/products/get/product_img_group`);
            dispatch({ type: GET_PRODUCT, payload: res1.data });
            const res2 = await Axios.get(URL + `/products/table/product_image`);
            dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });
      
            dispatch({ type: GET_PRODUCT_END });
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    }
}

export const deleteProductStock = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_START });

            // delete product
            await Axios.delete(URL + `/products/delete/stock/${id}`);
      
            // get product
            const res1 = await Axios.get(URL + `/products/get/product_details`);
            dispatch({ type: GET_PRODUCT, payload: res1.data });
            const res2 = await Axios.get(URL + `/products/table/product_stock`);
            dispatch({ type: GET_PRODUCT_TABLE, payload: res2.data });
      
            dispatch({ type: GET_PRODUCT_END });
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    }
}

export const transferStock = (body) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_START });

            // transfer stock
            await Axios.patch(URL + `/products/transfer-stock`, body);
      
            // get product
            const res = await Axios.get(URL + `/products/table/product_stock`);
            dispatch({ type: GET_PRODUCT_TABLE, payload: res.data });
      
            dispatch({ type: GET_PRODUCT_END });
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    }
}
