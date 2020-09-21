import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {makeStyles, Backdrop, CircularProgress, Button, Typography, Paper} from "@material-ui/core"
import DialogComp from "../component/dialog"

import {getAddress, updateWarehouseID, getWarehouse} from "../action"

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
    const [choose, setChoose] = React.useState(false)
    const [addressID, setAddressID] = React.useState(0)
    const [wareHouseID, setWareHouseID] = React.useState(0)
    
    const{id, address, cart, total, warehouse} = useSelector((state)=>{
        return{
            address: state.addressReducer.userAddress,
            id: state.userReducer.id,
            cart: state.cartReducer.cart,
            total: state.cartReducer.total,
            warehouse: state.warehouseReducer.warehouse
        }
    })

    React.useEffect(()=>{
        if(id){
            dispatch(getAddress(id))
        }
        dispatch(getWarehouse())
    },[])

    const renderAddress = ()=>{
        return address.map((item)=>{
            return(          
                <>
                    <Typography>{item.type}</Typography>
                    <Typography>{item.address}</Typography>
                    <Typography>{item.city}</Typography>
                    <Typography>{item.province}</Typography>
                    <Typography>{item.postcode}</Typography>
                </>
            )
            
        })
    }
    const handleClose = ()=>{
        setChoose(false)
    }

    const proceed = ()=>{
        const body = {
            order_number: cart[0].order_number,
            id: address[addressID].id
        }
        console.log("proceed id",address[addressID].id)
        console.log("order number : ", cart[0].order_number)
        dispatch(updateWarehouseID(body))
        setWareHouseID(cart[0].warehouse_id - 1)
    }
  
    return(
        <div className={classes.root}>
            <h1>Checkout Page</h1>
            <Paper>
                <Typography>Alamat Pengiriman</Typography>
                <Typography>{address.length !== 0? address[addressID].type : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].address : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].city : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].province : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].postcode : null}</Typography>
                <Button onClick={()=> proceed()}>
                    Lanjut
                </Button>
                <Button onClick={()=> setChoose(true)}>
                    Pilih Alamat Lain
                </Button>
                <Typography>Barang dikirim dari gudang {warehouse[wareHouseID]? warehouse[wareHouseID].name : null}</Typography>
            </Paper>
            <DialogComp
                open={choose}
                onClose={handleClose}
                text={renderAddress}/>
        </div>
    )
}

export default CheckOut