import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import {Link, Redirect} from 'react-router-dom';
import {getProduct, getCarousel, getProductCategory} from '../action'
import Carousel from '../component/carousel'

const useStyles = makeStyles(() => ({
    root: {
        margin: 0,
        paddingTop: "10vh",
        boxSizing: "border-box",
        background: "linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)"
      },
      header: {
        height: "70vh",
        width: "100%",
        backgroundSize: "cover", 
        backgroundPosition: "center",
        margin: 0,
      },
      title: {
        fontSize: 36,
        marginLeft: '1%'
      },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
        
    },
    productCard: {
        width : '100%',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'center',
        marginTop: '1%'
    },
    card : {
        flexBasis : '19%',
        minWidth : '15vw',
        marginBottom : '1%',
        marginRight : '1%',
    },
    link: {
        textDecoration: 'none'
    }
}));


export default function Products({location: {search}}) {
    const classes = useStyles()

    const { product, carousel, procat } = useSelector((state) => {
        return {
            product: state.productReducer.product,
            carousel: state.carouselReducer.carousel,
            procat: state.productReducer.procat
        }
    })
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProduct())
        dispatch(getCarousel())
        dispatch(getProductCategory(search ? search.slice(10) : null))
    }, [])

    const renderCard = () => {
        return (search ? procat : product).map(item =>{
            return (
                <Link to={{pathname:'/Produk-Detail', search: `id=${item.id}`, state: {id:`${item.id}`}}} key={item.id} className={classes.link}>
                    <Button>
                        <Card className={classes.card}>
                            <CardMedia className={classes.media} image={item.image[0]}/>
                            <CardContent>
                                <Typography>{item.name}</Typography>
                                <Typography>Rp. {item.price.toLocaleString()}</Typography>
                            </CardContent>
                        </Card>
                    </Button>
                </Link>
            )
        })
    }
    return (
        <div className={classes.root}>
            <div className = {classes.header} style={{backgroundImage: `url(${carousel[2]? carousel[2].image : null})`}}>
            </div>
            <Typography className={classes.title}>Products</Typography>
            <div className={classes.productCard}>
                {renderCard()}
            </div>
        </div>
    )
}