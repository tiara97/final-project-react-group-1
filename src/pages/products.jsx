import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import {Link, Redirect} from 'react-router-dom';
import {getProduct, getCarousel, getProductCategory} from '../action'
import Carousel from '../component/carousel'

const useStyles = makeStyles(() => ({
    root: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
      header: {
        height: "80vh",
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
        marginBottom : '5%',
        marginRight : '5%',
    },
    link: {
        textDecoration: 'none'
    },
    paper:{
        width: "90vw",
        marginTop: -30,
        background: "#EDECE8",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
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
            <Paper className={classes.paper}>
                <Typography className={classes.title}>Products</Typography>
                <div className={classes.productCard}>
                    {renderCard()}
                </div>
            </Paper>
        </div>
    )
}