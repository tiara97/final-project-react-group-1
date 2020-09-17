import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"
import cartReducer from "./cartReducer"

const allReducers = combineReducers({carouselReducer, categoryReducer, cartReducer})

export default allReducers