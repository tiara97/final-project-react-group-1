import {
    GET_PRODUCT_CATEGORY,
    FILTER_CATEGORY
} from "../action"

const INTIAL_STATE = {
    procat : [],
    filterProcat : [],
}

const productCategoryReducer = (state = INTIAL_STATE, action) => {
    switch(action.type){
        case GET_PRODUCT_CATEGORY:
            return {...state, procat: action.payload}
        case FILTER_CATEGORY:
            return {...state, filterProcat: action.payload}
        default:
            return state
    }
}

export default productCategoryReducer