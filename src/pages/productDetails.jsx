import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, addToCart, deleteError, addFavorite, getFavoriteByID, deleteFavorite } from '../action'
import { Carousel } from 'react-responsive-carousel'
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: "10vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    carousel: {
        height: "70vh",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    up_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        padding: '2%'
    },
    container_carousel: {
        flex: 2
    },
    container_content: {
        flex: 2,
        marginLeft: '5%'
    },
    content: {
        borderBottom: 'solid gray 0.5px',
        marginBottom: '2%',
        paddingBottom: '1%'
    },
    contentQty: {
        display: "flex",
        flexDirection: "column",
        padding: '1%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    productCard: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10%'
    },
    card: {
        flexBasis: '19%',
        minWidth: '300px',
        marginBottom: '1%',
        marginRight: '1%',
    },
    link: {
        textDecoration: 'none'
    },
    input: {
        width: "20px",
    },
    button: {
        margin: 10,
        width: 200
    },
    title: {
        marginRight: '10%',
        fontWeight: "bold"
    }
}))

const Color = ({ code, onPress, border = 0 }) => {
    return (
        <div
            onClick={onPress}
            style={
                {
                    backgroundColor: code,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    marginRight: '2%',
                    border: `black solid ${border}px`
                }}>
        </div>
    )
}

export default function ProductDetails ({location}) {
    const classes = useStyles()
    const [quantity, setQuantity] = React.useState(1)
    const [colorButton, setColorButton] = React.useState({
        name: '',
        id: null,
        index: null,
        stock: 1
    })
    const [toCart, setToCart] = React.useState(false)
    const [fav, setFav] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    const [openFav, setOpenFav] = React.useState(false)
    const [openCol, setOpenCol] = React.useState(false)
    const [toLogin, setToLogin] = React.useState(false)
    const [nonActive, setNonActive] = React.useState(false)
    
    // import reducer
    const { productDetails, user_id, errorCart, status_id, favorite } = useSelector((state) => {
        return {
            productDetails: state.productReducer.productDetails,
            user_id: state.userReducer.id,
            errorCart: state.cartReducer.error,
            status_id: state.userReducer.status,
            favorite: state.favoriteReducer.favorite
        }
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProductDetails(location.state ? location.state.id: 0))
        dispatch(getFavoriteByID())
    }, [])

    const renderCarousel = () => {
        return (productDetails.product ? productDetails.product.image : []).map((item, index)=>{
            return(
                <div key={index} style={{backgroundImage: `url(${item})`}} className={classes.carousel}>
                </div>
            )
        })
    }

    const renderColor = () => {
        return (productDetails.stock ? productDetails.stock : []).map((item, index) => {
            if(item.color[0] == colorButton.id){
                return (
                    <Color 
                        key = {item.color[0]}
                        code = {item.color[2]}
                        border = {2}
                        />
                        )
            } else {
                return (
                        <Color 
                        key = {item.color[0]}
                        code = {item.color[2]}
                        onPress = {() => setColorButton({name: item.color[2], id: item.color[0], index, stock: item.stock_available.reduce((a, b) => parseInt(a) + parseInt(b))})}
                    />
                )
            }
        })
    }

    const handleCart = () => {
        const body = {
            user_id: user_id,
            product_id: location.state.id, 
            color_id: colorButton.id, 
            qty: quantity, 
            price_each: productDetails.product.price,
            weight: productDetails.product.weight
        }
        if (!user_id) {
            return setOpenLogin(true)
        }
        if (status_id === 2) {
            return setNonActive(true)
        }
        console.log(body)
        dispatch(addToCart(body))

        setOpenDialog(true)
    }

    const handleFav = (product_id, color_id, price_each) => {
        if(!color_id) {
            return setOpenCol(true)
        }
        const body = {
            product_id: product_id,
            color_id: color_id,
            price_each: price_each
        }
        console.log(body)
        if (!user_id) {
            return setOpenLogin(true)
        }
        if (status_id === 2) {
            return setNonActive(true)
        }
        setOpenFav(true)
        dispatch(addFavorite(body))
    }

    const handleDelFav = () => {
        if (!user_id) {
            return setOpenLogin(true)
        }
        if (status_id === 2) {
            return setNonActive(true)
        }
        console.log(fav_id[0].id)
        dispatch(deleteFavorite(fav_id[0].id))
    }

    const handleClose = () => {
        setOpenDialog(false)
        dispatch(deleteError())
    }

    const handleProceed = () => {
        setOpenDialog(false)
        setToCart(true)
    }

    const handleCloseLogin = () => {
        setOpenLogin(false)
    }

    const handleToLogin = () => {
        setToLogin(true)
    }

    const handleCloseNonActive = () => {
        setNonActive(false)
    }
    if (toLogin) {
        return <Redirect to="/Login" />
    }
    if (toCart) {
        return <Redirect to="/Cart" />
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.up_container}>
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
                        <Typography style={{fontSize: 36, fontWeight: 'bold'}}>{productDetails.product ? productDetails.product.name : null}</Typography>
                        <Typography style={{marginRight: '10%'}}>{productDetails.category}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Harga</Typography>
                        <Typography style={{fontSize: 42, fontWeight: 'bold'}}>Rp. {productDetails.product ? productDetails.product.price.toLocaleString() : null}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Deskripsi</Typography>
                        <Typography variant="body1">{productDetails.product? productDetails.product.desc : null}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Material</Typography>
                        <Typography variant="body1">{productDetails.product ? productDetails.product.material : null}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Warna</Typography>
                        <div style={{ width: '100%', display: 'flex' }}>
                            {renderColor()}
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Ukuran</Typography>
                        <Typography variant="body1">Panjang: {productDetails.product ? productDetails.product.size[0] : null}cm, Lebar: {productDetails.product ? productDetails.product.size[1] : null}cm, Tinggi: {productDetails.product ? productDetails.product.size[2] : null}cm</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.title}>Stok</Typography>
                        <Typography variant="body1">Limited Stock! {productDetails.stock ? productDetails.stock[colorButton.index ? colorButton.index : 0].stock_available.reduce((a, b) => parseInt(a) + parseInt(b)) : 0} Available</Typography>
                    </div>
                    <div className={classes.contentQty}>
                        <div>

                            <IconButton
                            disabled={quantity <= 1 ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev - 1)}
                            >
                                <RemoveCircleOutlineOutlinedIcon />
                            </IconButton>
                            <TextField 
                                value={quantity <= colorButton.stock ? quantity : colorButton.stock} 
                                onChange={(event)=>setQuantity(parseInt(event.target.value? event.target.value : 1))}
                                className={classes.input}/>
                            <IconButton
                            disabled={quantity >= colorButton.stock ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev + 1)}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Button
                            className={classes.button}
                            disabled={colorButton.stock === 0 ? true : false}
                            variant="contained"
                            color="default"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={handleCart}
                        >
                            Add To Cart
                        </Button>
                        <IconButton

                            style={{ width: '50px', color: 'red' }}
                            onClick={fav_id.length > 0 ? () => handleDelFav() : () => handleFav(productDetails.id, colorButton.id, productDetails.price)}
                        >

                            {fav_id.length > 0 ? (
                                <FavoriteIcon />
                            ) : (
                                    <FavoriteBorderIcon />
                                )}
                        </IconButton>
                    </div>
                </div>
            </Paper>

            <DialogComp
                open={openDialog}
                onClose={handleClose}
                text={errorCart ? errorCart : "Produk berhasil dimasukkan ke keranjang!"}
                action={errorCart ? (
                    <Button
                        onClick={handleClose}>
                        Tutup
                    </Button>) : (
                        <Button
                            onClick={handleProceed}>
                            Lanjut
                        </Button>)} />
            <DialogComp
                open={openFav}
                onClose={() => setOpenFav(false)}
                text={'Produk berhasil dimasukkan ke favorit!'}
                action={
                    <Button
                        onClick={() => setOpenFav(false)}>
                        Tutup
                    </Button>
                }
            />
            <DialogComp
                open={openCol}
                onClose={() => setOpenCol(false)}
                text={'Harap pilih warna dulu.'}
                action={
                    <Button
                        onClick={() => setOpenCol(false)}>
                        Tutup
                    </Button>
                }
            />
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