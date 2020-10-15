import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Redirect, Link} from "react-router-dom"
import {makeStyles, 
        Backdrop, 
        CircularProgress, 
        Button, 
        Typography, 
        Paper, 
        Radio, RadioGroup, FormControl, FormControlLabel, 
        InputLabel, Select, MenuItem, IconButton, TextField} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import DialogComp from "../component/dialog"        
import bca from "../images/bca.png"
import bni from "../images/bni.png"
import gopay from "../images/gopay.png"
import kredivo from "../images/kredivo.png"
import mandiri from "../images/mandiri.png"

import {getAddress, updateWarehouseID, getWarehouse, checkoutAction, addAddress, updatePayment} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh",
        minHeight: "90vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    paper:{
        width: "50vw",
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
    },
    input:{
        display: "flex",
        flexDirection: "column"
    },
    divimg:{
        marginLeft: 5,
        width: "20vw",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    divContent:{
        marginBottom: 20
    },
    link:{
        textDecoration: "underline",
        color: "#3498db"
    }
}))



const CheckOut = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [payment, setPayment] = React.useState(1)
    const [pay, setPay] = React.useState(true)
    const [openAdd, setOpenAdd] = React.useState(false)
    const [confirm, setConfirm] =React.useState(false)
    const [toConfirmPage, setToConfirmPage] = React.useState(false)
    const [select, setSelect] = React.useState(null)
    // insert state
    const [addressNew, setAddressNew] = React.useState('');
    const [cityNew, setCityNew] = React.useState('');
    const [provinceNew, setProvinceNew] = React.useState('');
    const [postcodeNew, setPostcodeNew] = React.useState('');
    const [addressType, setAddressType] = React.useState(0)
    
    const{id, address, cart, total, warehouse, error, loading, errorCheckout, loadingCheckOut} = useSelector((state)=>{
        return{
            address: state.addressReducer.address,
            id: state.userReducer.id,
            cart: state.cartReducer.cart,
            total: state.cartReducer.total,
            warehouse: state.warehouseReducer.warehouse,
            error: state.cartReducer.errorOngkir,
            loading: state.cartReducer.loading,
            errorCheckout: state.orderReducer.errorCheckout,
            loadingCheckOut: state.orderReducer.loading
        }
    })

    React.useEffect(()=>{
        dispatch(getAddress())
        dispatch(getWarehouse())
        if(address[0]){
            setSelect(address[0].id)
            const body = {
                order_number: cart[0].order_number,
                id: address[0].id,
                user_id: id
            }
            console.log(body)
            dispatch(updateWarehouseID(body))
        }
        if(payment){
            const body = {
                order_number: cart[0].order_number,
                user_id: id,
                payment_method_id: payment
            }
            dispatch(updatePayment(body))
        }
    },[])

  
    const renderAddress = ()=>{
        return(
        <>
        <Select
                value={select}
                onChange={handleSelect}>
                {address.map((item)=>{
                return(          
                     <MenuItem key={item.id} value={item.id}>
                         ({item.type}) {item.address} {item.city} {item.province} {item.postcode}
                        </MenuItem>
                )
            })}
            <MenuItem value={0} onClick={()=>setOpenAdd(true)}>
                <IconButton ><AddIcon/></IconButton>
            Tambah alamat baru    
            </MenuItem>
        </Select>
        </>)
    }

    const handleLoc = () => {
        const successCB = (position) => {
            console.log(position)
            let lat = position.coords.latitude
            let long = position.coords.longitude
            handleAdd(lat, long)
        }
        const errorCB = (error) => {
            console.log(error)
        }
        navigator.geolocation.getCurrentPosition(successCB, errorCB)
    }

    const handleAdd = (lat, long) => {
        let address = addressNew
        let city = cityNew
        let province = provinceNew
        let postcode = postcodeNew
        let type = addressType
        const body = { type ,address, city, province, postcode, latitude: lat, longitude: long }
        console.log(body)
        dispatch(addAddress(body))
        setOpenAdd(false)
    };
    const handleSelect = (event)=>{
        if(event.target.value === 0) return
        const body = {
            order_number: cart[0].order_number,
            id: event.target.value,
            user_id: id
        }
        console.log(body)
        dispatch(updateWarehouseID(body))
     
        
        setSelect(body.id)
    }
   
 
    const handleChangeRadio = (event) =>{
        const body = {
            order_number: cart[0].order_number,
            user_id: id,
            payment_method_id: event.target.value
        }
        dispatch(updatePayment(body))
        setPayment(event.target.value)
        console.log("radio", event.target.value)
        if(!error){
            setPay(false)
        }
    }

    const handleCloseConfirm = () =>{
        setConfirm(false)
        
    }

    const handleCheckout = ()=>{
        dispatch(checkoutAction(cart[0].order_number))
        setConfirm(true)
    }
    const handleToConfirm = ()=>{
        setConfirm(false)
        setToConfirmPage(true)
    }

    if(toConfirmPage && !loading && !errorCheckout && !loadingCheckOut){
        return <Redirect to={{pathname:`/Konfirmasi`, search:`${cart[0].order_number}`}}/>
    }

    console.log(cart[0].warehouse_id - 1)
  
    return(
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <h1>Checkout Page</h1>
            <Paper className={classes.paper}>
                <div className={classes.divContent}>
                    <Typography style={{fontWeight: "bold"}}>Pilih Alamat Pengiriman</Typography>
                    {renderAddress()}
                    {error? <Typography>{error}</Typography> : <>
                    <Typography>Barang dikirim dari gudang { warehouse[cart[0].warehouse_id-1]? warehouse[cart[0].warehouse_id-1].name : ''}</Typography> 
                    <Typography>Total ongkir adalah Rp. {cart[0]? parseInt(cart[0].total_ongkir).toLocaleString(): '0'}</Typography>
                    <Typography>Total biaya yang harus dibayar adalah Rp. {cart[0]?(parseInt(total) + parseInt(cart[0].total_ongkir)).toLocaleString(): '0'}</Typography>
                    </>}
                    <Link to="/Ongkir" className={classes.link}>
                    Detail Ongkos Kirim
                    </Link>
                </div>
                <div className={classes.divContent}>
                    <Typography style={{fontWeight: "bold"}}>Pilih Metode Pembayaran</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="payment" name="payment" value={payment} onChange={handleChangeRadio}>
                            <FormControlLabel value={1} control={<Radio />} label="Bank Transfer" />
                            <div className={classes.divimg}>
                                <img src={bca} alt="bca" width="100px"/>
                                <img src={mandiri} alt="mandiri" width="100px"/>
                                <img src={bni} alt="bni" width="100px"/>
                            </div>
                            <FormControlLabel value={2} control={<Radio />} label="Cicilan 0% " />
                            <div>
                                <img src={kredivo} alt="kredivo" width="100px"/>
                            </div>
                            <FormControlLabel value={3} control={<Radio />} label="Gopay" />
                            <div>
                                <img src={gopay} alt="gopay" width="100px"/>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>

                <Button 
                    className={classes.button} 
                    variant="contained" 
                    disabled={error}
                    onClick={handleCheckout}>
                    Lanjut Ke Pembayaran
                </Button>
            </Paper>
            <DialogComp
                open={confirm}
                onClose={handleCloseConfirm}
                text={errorCheckout? errorCheckout : "Pesanan anda berhasil, silakan lakukan konfirmasi pembayaran!"}
                action={errorCheckout? 
                        <Link to="/Cart">
                            <Button>
                                Kembali
                            </Button>
                        </Link> :
                        <Button
                                onClick={handleToConfirm}>
                                Lanjut
                        </Button>
                        }
            />
            <DialogComp
                open={openAdd}
                title="Tambah Alamat Baru"
                onClose={()=>setOpenAdd(false)}
                text={<div className={classes.input}>
                        <InputLabel>
                            Tipe
                        </InputLabel>
                        <Select
                            value={addressType}
                            onChange={(event)=>setAddressType(event.target.value)}>
                            <MenuItem value={1}>Rumah</MenuItem>
                            <MenuItem value={2}>Kantor</MenuItem>
                            <MenuItem value={3}>Apartemen</MenuItem>
                            <MenuItem value={4}>Gedung Komersial</MenuItem>
                        </Select>
                        <TextField label="Alamat" variant='outlined' onChange={(event) => setAddressNew(event.target.value)} value={addressNew} size='small' required/>
                        <TextField label="Kota" variant='outlined' onChange={(event) => setCityNew(event.target.value)} value={cityNew} size='small' required/>
                        <TextField  label="Provinsi" variant='outlined' value={provinceNew} onChange={(event) => setProvinceNew(event.target.value)} size='small' required/>
                        <TextField  label="Kodepos" variant='outlined' value={postcodeNew} onChange={(event) => setPostcodeNew(event.target.value)} size='small' required/>
                    </div>}
                action={
                    <>
                    <Button onClick={handleLoc}>
                        Simpan
                    </Button>
                    <Button onClick={()=>setOpenAdd(false)}>
                        Batal
                    </Button>
                    </>
                }/>
        </div>
    )
}

export default CheckOut