import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Redirect} from "react-router-dom"
import {makeStyles, 
        Backdrop, 
        CircularProgress, 
        Button, 
        Typography, 
        Paper, 
        Dialog, 
        List, 
        ListItem, 
        ListItemText,
        Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from "@material-ui/core"

import DialogComp from "../component/dialog"        

import {getAddress, updateWarehouseID, getWarehouse, checkoutAction} from "../action"

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
    const [addressID, setAddressID] = React.useState(0)
    const [wareHouseID, setWareHouseID] = React.useState(0)
    const [whName, setWhName] = React.useState("")
    const [openDialog, setOpenDialog] = React.useState(false)
    const [radio, setRadio] = React.useState(true)
    const [pay, setPay] = React.useState(true)
    const [confirm, setConfirm] =React.useState(false)
    const [toConfirmPage, setToConfirmPage] = React.useState(false)
    
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
        return address.map((item,index)=>{
            return(          
                <Paper elevation={2} className={classes.paperlist}>
                    <ListItem key={item.id} className={classes.list} onClick={()=> handleChoose(index)}>
                        <ListItemText className={classes.listitem}>{item.type}</ListItemText>
                        <ListItemText className={classes.listitem}>{item.address}</ListItemText>
                        <ListItemText className={classes.listitem}>{item.city}</ListItemText>
                        <ListItemText className={classes.listitem}>{item.province}</ListItemText>
                        <ListItemText className={classes.listitem}>{item.postcode}</ListItemText>
                    </ListItem>
                </Paper>
            )
            
        })
    }
    const handleChoose = (id)=>{
        setOpenDialog(false)
        setAddressID(id)
    }
    const handleClose = ()=>{
        setOpenDialog(false)
    }

    const proceed = ()=>{
        const body = {
            order_number: cart[0].order_number,
            id: address[addressID].id
        }
        console.log("proceed id",address[addressID].id)
        console.log("order number : ", cart[0].order_number)
        dispatch(updateWarehouseID(body))
        setWareHouseID(cart[0].warehouse_id)
        // renderWarehouse()
        setRadio(false)
    }

    const renderWarehouse = ()=>{
        return warehouse.map((item)=>{
           return item.id === wareHouseID? (setWhName(item.name)) : (null)
        })
    }
 
    const handleChange = () =>{
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
                <Typography>{address.length !== 0? address[addressID].type : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].address : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].city : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].province : null}</Typography>
                <Typography>{address.length !== 0? address[addressID].postcode : null}</Typography>
                <div>
                    <Button className={classes.button} variant="contained" onClick={()=> proceed()}>
                        Lanjut
                    </Button>
                    <Button className={classes.button} variant="contained" onClick={()=> setOpenDialog(true)}>
                        Pilih Alamat Lain
                    </Button>
                </div>
            
                {/* {whName !== ""?
                <Typography>Barang dikirim dari gudang {whName}</Typography> : null} */}
                <Typography>Pilih Metode Pembayaran</Typography>
            
                <FormControl disabled={radio} component="fieldset" onChange={handleChange}>
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
            <Dialog
                open={openDialog}
                onClose={handleClose}>
                <List>
                    {renderAddress()}
                </List>
            </Dialog>
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