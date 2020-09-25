import {
  GET_PRODUCT,
  GET_PRODUCT_TABLE,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_START,
  GET_PRODUCT_END,
  GET_PRODUCT_COLOR,
  GET_PRODUCT_WAREHOUSE,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_START,
  ADD_PRODUCT_END
} from "../action";

const INITIAL_STATE = {
  product: [],
  productDetails: [],
  procat: [],
  productByTable: [],
  productColor: [],
  productWarehouse: [],
  loading: false,
  errorAdd: ''
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    case GET_PRODUCT_START:
      return { ...state, loading: true };
    case GET_PRODUCT_END:
      return { ...state, loading: false };
    case ADD_PRODUCT_START:
      return { ...state, errorAdd: '' };
    case ADD_PRODUCT_END:
      return { ...state, errorAdd: '' };
    case ADD_PRODUCT_ERROR:
      return { ...state, errorAdd: action.payload.errors };
    case GET_PRODUCT_TABLE:
      return { ...state, productByTable: action.payload };
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
