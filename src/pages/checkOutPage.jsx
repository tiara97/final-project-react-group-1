import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Redirect} from "react-router-dom"
import {makeStyles, 
        Backdrop, 
        CircularProgress, 
        Button, 
        Typography, 
        Paper, 
        Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Select, MenuItem} from "@material-ui/core"

import DialogComp from "../component/dialog"        

import {getAddress, updateWarehouseID, getWarehouse, checkoutAction, getOngkir} from "../action"

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
    paper:{
        width: "70vw",
        padding: 20,
        display: "flex",
        flexDirection: "column"
    },
    list:{
        display: "flex",
        flexDirection: "column"
    },
    listitem:{
        textAlign: "left"
    },
    paperlist:{
        margin: 10,
        cursor: "pointer"
    },
    button:{
        margin: 5
    }
}))



const CheckOut = ({location: {search}}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [wareHouseID, setWareHouseID] = React.useState(0)
    const [whName, setWhName] = React.useState("")
    const [radio, setRadio] = React.useState(true)
    const [pay, setPay] = React.useState(true)
    const [confirm, setConfirm] =React.useState(false)
    const [toConfirmPage, setToConfirmPage] = React.useState(false)
    
    const{id, address, cart, total, warehouse, error} = useSelector((state)=>{
        return{
            address: state.addressReducer.userAddress,
            id: state.userReducer.id,
            cart: state.cartReducer.cart,
            total: state.cartReducer.total,
            warehouse: state.warehouseReducer.warehouse,
            error: state.cartReducer.errorOngkir
        }
    })

    React.useEffect(()=>{
        if(id){
            dispatch(getAddress(id))
        }
        dispatch(getWarehouse())
    },[])

    const renderAddress = ()=>{
        return <Select
                value={address[0]? address[0].id : 0}
                onChange={handleSelect}>
                {address.map((item)=>{
                return(          
                     <MenuItem key={item.id} value={item.id}>
                         ({item.type}) {item.address} {item.city} {item.province} {item.postcode}
                        </MenuItem>
                )
            })}
        </Select>
    }


    const handleSelect = (event)=>{
        const body = {
            order_number: cart[0].order_number,
            id: event.target.value,
            user_id: id
        }
        console.log(body)
        dispatch(updateWarehouseID(body))
        dispatch(getOngkir(body))
        renderWarehouse()
        setRadio(false)
        setWareHouseID(body.id)
    }
    // dikasih loading dan fungsi get ongkir dan warehouseID dipanggil di awal

    const renderWarehouse = ()=>{
        return warehouse.map((item)=>{
           return item.id === cart[0].warehouse_id? (setWhName(item.name)) : (null)
        })
    }
 
    const handleChangeRadio = () =>{
        setPay(false)
    }

    const handleCloseConfirm = () =>{
        setConfirm(false)
        
    }

    const handleToConfirm = ()=>{
        dispatch(checkoutAction(cart[0].order_number))
        setConfirm(false)
        setToConfirmPage(true)
    }

    if(toConfirmPage){
        return <Redirect to={{pathname:`/Konfirmasi`, search:`${cart[0].order_number}`}}/>
    }
  
    return(
        <div className={classes.root}>
            <h1>Checkout Page</h1>
            <Paper className={classes.paper}>
            <Typography>Alamat Pengiriman</Typography>

                {renderAddress()}
                
                {error? <Typography>{error}</Typography> : <>
                <Typography>Barang dikirim dari gudang {whName}</Typography> 
                <Typography>Total ongkir adalah Rp. {cart[0]? cart[0].total_ongkir.toLocaleString(): null}</Typography>
                <Typography>Total biaya yang harus dibayar adalah Rp. {cart[0]?(total + cart[0].total_ongkir).toLocaleString(): null}</Typography>
                <Typography>Pilih Metode Pembayaran</Typography>
                </>}
              
                <FormControl disabled={radio} component="fieldset" onChange={handleChangeRadio}>
                    <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel value="female" control={<Radio />} label="Bank Transfer" />
                        <FormControlLabel value="male" control={<Radio />} label="Cicilan 0% " />
                        <FormControlLabel value="other" control={<Radio />} label="Gopay" />
                    </RadioGroup>
                </FormControl>

                <Button 
                    className={classes.button} 
                    variant="contained" 
                    disabled={pay}
                    onClick={()=>setConfirm(true)}>
                    Lanjut Ke Pembayaran
                </Button>
            </Paper>
            <DialogComp
                open={confirm}
                onClose={handleCloseConfirm}
                text="Pesanan anda berhasil, silakan lakukan konfirmasi pembayaran!"
                action={<Button
                            onClick={handleToConfirm}>
                            Lanjut
                        </Button>}
            />
        </div>
    )
}

export default CheckOut