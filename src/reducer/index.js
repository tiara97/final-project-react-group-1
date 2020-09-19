import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"
import cartReducer from "./cartReducer"
import warehouseReducer from "./warehouseReducer"

const allReducers = combineReducers({carouselReducer, categoryReducer, cartReducer, warehouseReducer})

export default allReducers