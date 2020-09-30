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

import {getAddress, updateWarehouseID, getWarehouse, checkoutAction, addAddress} from "../action"

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
    },
    input:{
        display: "flex",
        flexDirection: "column"
    }
}))



const CheckOut = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [radio, setRadio] = React.useState(true)
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
        // setAddressNew('')
        // setCityNew('')
        // setProvinceNew('')
        // setPostcodeNew('')
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
   
 
    const handleChangeRadio = () =>{
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

    if(toConfirmPage && !loading && errorCheckout && !loadingCheckOut){
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
            <Typography>Pilih Alamat Pengiriman</Typography>

                {renderAddress()}
                
                {error? <Typography>{error}</Typography> : <>
                <Typography>Barang dikirim dari gudang { warehouse[cart[0].warehouse_id-1]? warehouse[cart[0].warehouse_id-1].name : ''}</Typography> 
                <Typography>Total ongkir adalah Rp. {cart[0]? parseInt(cart[0].total_ongkir).toLocaleString(): '0'}</Typography>
                <Typography>Total biaya yang harus dibayar adalah Rp. {cart[0]?(parseInt(total) + parseInt(cart[0].total_ongkir)).toLocaleString(): '0'}</Typography>
                <Typography>Pilih Metode Pembayaran</Typography>
                </>}
              
                <FormControl component="fieldset" onChange={handleChangeRadio}>
                    <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel value="female" control={<Radio />} label="Bank Transfer" />
                        <FormControlLabel value="male" control={<Radio />} label="Cicilan 0% " />
                        <FormControlLabel value="other" control={<Radio />} label="Gopay" />
                    </RadioGroup>
                </FormControl>

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