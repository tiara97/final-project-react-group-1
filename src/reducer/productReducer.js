import {
  GET_PRODUCT,
  GET_PRODUCT_ADMIN,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_START,
  GET_PRODUCT_END,
  GET_PRODUCT_COLOR,
  GET_PRODUCT_WAREHOUSE,
} from "../action";

const INITIAL_STATE = {
  product: [],
  productDetails: [],
  procat: [],
  productAdmin: [],
  productColor: [],
  productWarehouse: [],
  loading: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    case GET_PRODUCT_START:
      return { ...state, loading: true };
    case GET_PRODUCT_END:
      return { ...state, loading: false };
    case GET_PRODUCT_ADMIN:
      return { ...state, productAdmin: action.payload };
    case GET_PRODUCT_COLOR:
      return { ...state, productColor: action.payload };
    case GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case GET_PRODUCT_CATEGORY:
      return { ...state, procat: action.payload };
    case GET_PRODUCT_WAREHOUSE:
      return { ...state, productWarehouse: action.payload };
    default:
      return state;
  }
};

export default productReducer;
