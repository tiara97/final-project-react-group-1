import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProductDetails, addToCart, deleteError} from '../action'
import {Carousel} from 'react-responsive-carousel'
import DialogComp from "../component/dialog"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Redirect, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {
    Button, 
    Typography, 
    Paper, 
    IconButton,
    TextField,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: "10vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    carousel:{
        height: "70vh",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    up_container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        padding: '2%'
    },
    container_carousel:{
        flex: 2
    },
    container_content:{
        flex: 2,
        marginLeft: '5%'
    },
    content:{
        borderBottom: 'solid gray 0.5px',
        marginBottom: '2%',
        paddingBottom: '1%'
    },
    contentQty:{
        display: "flex",
        flexDirection: "column",
        padding: '1%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    productCard: {
        width : '100%',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'center',
        marginTop: '10%'
    },
    card : {
        flexBasis : '19%',
        minWidth : '300px',
        marginBottom : '1%',
        marginRight : '1%',
    },
    link: {
        textDecoration: 'none'
    },
    input:{
        width: "20px",
    },
    button:{
        margin: 10
    },
    title:{
        marginRight: '10%', 
        fontWeight: "bold"
    }
}))

const Color = ({code, onPress, border = 0}) => {
    return (
        <div 
            onClick={onPress} 
            style={
                {backgroundColor: code, 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    marginRight: '2%', 
                    border: `black solid ${border}px`}}>
        </div>
    )
}

export default function ProductDetails ({location: {state: {id}}}) {
    const classes = useStyles()
    const [quantity, setQuantity] = React.useState(0)
    const [colorButton, setColorButton] = React.useState({
        name: '',
        id: null
    })
    const [toCart, setToCart] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    const [toLogin, setToLogin] = React.useState(false)
    const [nonActive, setNonActive] = React.useState(false)
    // import reducer
    const { productDetails, user_id, errorCart, status_id } = useSelector((state) => {
        return {
            productDetails: state.productReducer.productDetails,
            user_id: state.userReducer.id,
            errorCart: state.cartReducer.error,
            status_id: state.userReducer.status
        }
    })
    const dispatch = useDispatch()
    const stock = productDetails.stock_available ? productDetails.stock_available.reduce((a, b) => parseInt(a) + parseInt(b)) : 0
    const color = [
        {id: 1, name: 'Black', code: '#2d3436'}, {id: 2, name: 'White', code: '#f5f5f5'}, {id: 3, name: 'Natural', code: '#dfe4ea'},
        {id: 4, name: 'Blue', code: '#3742fa'}, {id: 5, name: 'Green', code: '#2ed573'}, {id: 6, name: 'Red', code: '#EA2027'}
    ]
    const colorArr = productDetails.color ? productDetails.color : []
    const uniqueColor = colorArr.filter((x, i, a) => a.indexOf(x) == i)

    React.useEffect(() => {
        dispatch(getProductDetails(id? id: 0))
    }, [])

    const renderCarousel = () => {
        return (productDetails.image ? productDetails.image : []).map((item, index)=>{
            return(
                <div key={index} style={{backgroundImage: `url(${item})`}} className={classes.carousel}>
                </div>
            )
        })
    }

    const renderColor = () => {
        return uniqueColor.map(item => color.filter(val => val.name === item)).map((item) => {
            if(item[0].name == colorButton.name){
                return (
                    <Color 
                        key = {item[0].id}
                        code = {item[0].code}
                        border = {2}
                        onPress = {() => setColorButton({name: item[0].name, id: item[0].id})}
                    />
                )
            } else {
                return (
                    <Color 
                        key = {item[0].id}
                        code = {item[0].code}
                        onPress = {() => setColorButton({name: item[0].name, id: item[0].id})}
                    />
                )
            }
        })
    }
 
    const handleCart = () => {
        const body ={
            user_id: user_id,
            product_id: id, 
            color_id: colorButton.id, 
            qty: quantity, 
            price_each: productDetails.price,
            weight: productDetails.weight
        }
        if(!user_id){
            return setOpenLogin(true)
        }
        if(status_id === 2){
            return setNonActive(true)
        }
        console.log(body)
        dispatch(addToCart(body))

        setOpenDialog(true)
    }

    const handleClose=()=>{
        setOpenDialog(false)
        dispatch(deleteError())
    }

    const handleProceed=()=>{
        setOpenDialog(false)
        setToCart(true)
    }

    const handleCloseLogin=()=>{
        setOpenLogin(false)
    }
    
    const handleToLogin = () =>{
        setToLogin(true)
    }

    const handleCloseNonActive=()=>{
        setNonActive(false)
    }
    if(toLogin){
        return <Redirect to="/Login"/>
    }
    if(toCart){
        return <Redirect to="/Cart"/>
    }
    
    return (
        <div className={classes.root}>
            <Paper elevation = {2} className={classes.up_container}>
                <div className={classes.container_carousel}>
                    <Carousel
                        autoPlay={true} 
                        infiniteLoop={true} 
                        dynamicHeight={true}
                        showStatus={false}
                        showThumbs={false}
                        swipeable={true}
                        emulateTouch={true}
                    >
                        {renderCarousel()}
                    </Carousel>
                </div>
                <div className={classes.container_content}>
                    <div className={classes.content}>
                        <Typography style={{fontSize: 36, fontWeight: 'bold'}}>{productDetails.name ? productDetails.name : null}</Typography>
                        <Typography style={{marginRight: '10%'}}>{productDetails.category}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Harga</Typography>
                        <Typography style={{fontSize: 42, fontWeight: 'bold'}}>Rp. {productDetails.price ? productDetails.price.toLocaleString() : null}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Deskripsi</Typography>
                        <Typography variant="body1">{productDetails.desc}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Material</Typography>
                        <Typography variant="body1">{productDetails.material}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Warna</Typography>
                        <div style={{width: '100%', display: 'flex'}}>
                            {renderColor()}
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Ukuran</Typography>
                        <Typography variant="body1">Panjang: {productDetails.size ? productDetails.size[0] : null}cm, Lebar: {productDetails.size ? productDetails.size[1] : null}cm, Tinggi: {productDetails.size ? productDetails.size[2] : null}cm</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Stok</Typography>
                        <Typography variant="body1">Limited Stock! {productDetails.stock_available ? productDetails.stock_available.reduce((a, b) => parseInt(a) + parseInt(b)) : 0} Available</Typography>
                    </div>
                    <div className={classes.contentQty}>
                        <div>

                            <IconButton
                            disabled={quantity <= 0 ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev - 1)}
                            >
                                <RemoveCircleOutlineOutlinedIcon/>
                            </IconButton>
                            <TextField 
                                value={quantity} 
                                onChange={(event)=>setQuantity(parseInt(event.target.value? event.target.value : 1))}
                                className={classes.input}/>
                            {/* <h3>{quantity}</h3> */}
                            <IconButton
                            disabled={quantity >= stock ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev + 1)}
                            >
                                <AddIcon/>
                            </IconButton>
                        </div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="default"
                            startIcon={<AddShoppingCartIcon/>}
                            onClick={handleCart}
                        >
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </Paper>
            
            <DialogComp
                 open={openDialog}
                 onClose={handleClose}
                 text={errorCart? errorCart : "Produk berhasil dimasukkan ke keranjang!"}
                 action={errorCart? (
                    <Button
                        onClick={handleClose}>
                        Tutup
                    </Button>) :(
                    <Button
                        onClick={handleProceed}>
                        Lanjut
                    </Button>)}/>
            <DialogComp
                 open={openLogin}
                 onClose={handleCloseLogin}
                 text="Anda belum login!"
                 action={
                    <>
                    <Button
                        onClick={handleToLogin}>
                        Login
                    </Button>
                    <Button
                        onClick={handleCloseLogin}>
                        Tutup
                    </Button>
                    </>}
                />
            <DialogComp
                 open={nonActive}
                 onClose={handleCloseNonActive}
                 text="Anda belum melakukan aktivasi akun!"
                 action={
                    <>
                    <Button
                        onClick={handleCloseNonActive}>
                        Tutup
                    </Button>
                    </>}
                />
        </div>
    )
}