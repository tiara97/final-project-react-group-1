import {GET_PRODUCT,GET_PRODUCT_CATEGORY,GET_PRODUCT_DETAILS} from '../action'
const INITIAL_STATE ={
    product: [],
    productDetails: [],
    procat: []
}

const productReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_PRODUCT:
            return{...state, product: action.payload}
        case GET_PRODUCT_DETAILS:
            return{...state, productDetails: action.payload}
        case GET_PRODUCT_CATEGORY:
            return{...state, procat: action.payload}
        default:
            return state
    }
}

export default productReducer