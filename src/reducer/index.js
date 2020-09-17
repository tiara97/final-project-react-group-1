import {combineReducers} from "redux"

import carouselReducer from "./carouselReducer"
import categoryReducer from "./categoryReducer"
import profileReducer from "./profileReducer"
import userReducer from "./userReducer"

const allReducers = combineReducers({carouselReducer, categoryReducer, profileReducer, userReducer})

export default allReducers