import {
    URL,
    GET_TOP_PRODUCT
  } from "./helper";
import Axios from "axios";

export const getTopProduct = () => {
    return async (dispatch) => {
      try {
        // get top product
        const res = await Axios.get(URL + '/report/top/5');
        dispatch({ type: GET_TOP_PRODUCT, payload: res.data });
  
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };
  };