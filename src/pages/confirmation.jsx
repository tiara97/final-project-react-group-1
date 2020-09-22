import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeStyles} from "@material-ui/core"

import {getOrderByNumber} from "../action"

const useStyles = makeStyles(()=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    }
}))

const Confirmation = ({location: {search}})=>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const order_number = search.slice(1)

    const {order} = useSelector((state)=>{
        return{
            order: state.orderReducer.order
        }
    })
    React.useEffect(()=>{
        if(order_number){
            dispatch(getOrderByNumber(order_number))
        }
    },[])

    return(
        <div className={classes.root}>
            <h1>Confirmation Page</h1>
        </div>
    )
}

export default Confirmation