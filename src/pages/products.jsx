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
        paddingTop: "10vh",
      },
      header: {
        height: "70vh",
        width: "80vw",
        backgroundSize: "cover", 
        backgroundPosition: "center",
        margin: '0 auto',
      },
      title: {
        fontSize: 36,
        marginLeft: '10%'
      },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
        minWidth : '300px',
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
                            <Typography>{item.name}</Typography>
                            <Typography>Rp. {item.price.toLocaleString()}</Typography>
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