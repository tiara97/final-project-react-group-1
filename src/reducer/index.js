import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"
import profileReducer from "./profileReducer"
import userReducer from "./userReducer"
import orderReducer from "./orderReducer"

const allReducers = combineReducers({carouselReducer, categoryReducer, profileReducer, userReducer, orderReducer})

export default allReducers