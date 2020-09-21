import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProductDetails} from '../action'
import {Carousel} from 'react-responsive-carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Redirect, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {
    Button, 
    Typography, 
    Paper
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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
        flexDirection: "row",
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
    }
}))

const Color = ({code, onPress, border = 0}) => {
    return (
        <div onClick={onPress} style={{backgroundColor: code, width: 50, height: 50, borderRadius: '50%', marginRight: '2%', border: `black solid ${border}px`}}></div>
    )
}

export default function ProductDetails ({location: {state: {id}}}) {
    const classes = useStyles()

    const [quantity, setQuantity] = React.useState(0)
    const [colorButton, setColorButton] = React.useState({
        name: '',
        id: null
    })
    
    const { productDetails } = useSelector((state) => {
        return {
            productDetails: state.productReducer.productDetails
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
        // user_id, product_id, color_id, qty, price_each => parameter yang dibutuhkan untuk addToCart di cartController
        // kurang user_id => ada di userAction
        let product_id = id
        let price_each = productDetails.price
        console.log('price', price_each)
        console.log(`product_id: ${product_id}, qty: ${quantity}, color_id: ${colorButton.id}`)
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
                        <Typography style={{marginRight: '10%'}}>Harga</Typography>
                        <Typography style={{fontSize: 42, fontWeight: 'bold'}}>Rp. {productDetails.price ? productDetails.price.toLocaleString() : null}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography style={{marginRight: '10%'}}>Deskripsi</Typography>
                        <Typography style={{fontSize: 18}}>{productDetails.desc}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography style={{marginRight: '10%'}}>Material</Typography>
                        <Typography style={{fontSize: 18}}>{productDetails.material}</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography style={{marginRight: '10%'}}>Warna</Typography>
                        <div style={{width: '100%', display: 'flex'}}>
                            {renderColor()}
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Typography style={{marginRight: '10%'}}>Ukuran</Typography>
                        <Typography style={{fontSize: 18}}>Panjang: {productDetails.size ? productDetails.size[0] : null}cm, Lebar: {productDetails.size ? productDetails.size[1] : null}cm, Tinggi: {productDetails.size ? productDetails.size[2] : null}cm</Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography style={{marginRight: '10%'}}>Stok</Typography>
                        <Typography style={{fontSize: 18}}>Limited Stock! {productDetails.stock_available ? productDetails.stock_available.reduce((a, b) => parseInt(a) + parseInt(b)) : 0} Available</Typography>
                    </div>
                    <div className={classes.contentQty}>
                        <button 
                            disabled={quantity <= 0 ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev - 1)}>-</button>
                        <h3>{quantity}</h3>
                        <button 
                            disabled={quantity >= stock ? true : false}
                            variant="outlined"
                            style={{width:'50px'}}
                            onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        &nbsp;&nbsp;
                        <Button
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
        </div>
    )
}