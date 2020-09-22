import { URL, GET_ADDRESS} from "./helper"
import Axios from "axios"

export const getAddress = (id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(URL + `/address/get/`+ id)
            console.log(res.data)
            dispatch({ type: GET_ADDRESS, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
}
