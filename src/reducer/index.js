import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"

const allReducers = combineReducers({carouselReducer, categoryReducer})

export default allReducers