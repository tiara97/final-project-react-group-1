import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {makeStyles, Backdrop, CircularProgress, Button} from "@material-ui/core"

import {getWarehouse} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}))



const CheckOut = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [warehouseID, setWarehouseID] = React.useState(null)
    const [warehouseName, setWarehouseName] = React.useState("")

    // test lat long
    const geoloc = {
        lat: -6.396763,
        long: 106.781426
    }

    // import redux
    const {warehouse, loading} = useSelector((state)=>{
        return{
            warehouse: state.warehouseReducer.warehouse,
            loading: state.warehouseReducer.loading
        }
    })

    // get data on first render
    React.useEffect(()=>{
        dispatch(getWarehouse())
    },[])

    let R = 6371e3
    let φ1 = 0
    let φ2 = 0
    let Δφ = 0
    let Δλ = 0
    let a = 0
    let c =0
    let d = 0
    let lat1 = geoloc.lat
    let lat2 = 0
    let lon1 = geoloc.long
    let lon2 = 0
    let jarak = []
    let id = null

    const getClosestWarehouse = ()=>{
        
        warehouse.map((item)=>{
            return(
                lat2 = item.latitude,
                lon2 = item.longitude,
                φ1 =lat1 * Math.PI/180, // φ, λ in radians
                φ2 = lat2 * Math.PI/180,
                Δφ = (lat2-lat1) * Math.PI/180,
                Δλ = (lon2-lon1) * Math.PI/180,
                a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2),
                c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
                d = R * c, // in metres
                jarak.push(d),
                d === Math.min(...jarak)? id = item.id : null
                )
                
            })
       console.log("id : ", id)
       setWarehouseID(id)
       console.log(jarak)
       console.log("Min ", Math.min(...jarak))
    }
  
    console.log(warehouse)
    console.log(warehouseID)
    return(
        <div className={classes.root}>
            <Button onClick={getClosestWarehouse}>
                Get Warehouse
            </Button>
            {/* {getClosestWarehouse()} */}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <h1>Checkout Page</h1>
        </div>
    )
}

export default CheckOut