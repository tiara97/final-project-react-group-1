import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"
import productReducer from './productReducer'

const allReducers = combineReducers({carouselReducer, categoryReducer, productReducer})

export default allReducers