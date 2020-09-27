import React from "react"
import { useDispatch, useSelector} from 'react-redux'
import {getTopProduct} from '../action'
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper,
    Select,
    MenuItem, 
    Chip,
    makeStyles
} from '@material-ui/core';
import {Link} from 'react-router-dom'
// import component
import CarouselComp from "../component/carousel"

const useStyles = makeStyles(() => ({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5'
    },
    containerProduct:{
        marginTop: '5%',
        width: '90%',
        backgroundColor: "#EDECE8",
    },
    topProduct: {
        width : '100%',
        display : 'flex',
        justifyContent : 'space-evenly',
        marginTop: '1%'
    },
    card : {
        flexBasis : '19%',
        minWidth : '15vw',
        marginBottom : '5%',
        marginRight : '5%',
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    link: {
        textDecoration: 'none'
    },
    title: {
        fontSize: 36,
        marginLeft: '1%',
        marginBottom: '3%'
    },
    catalog : {
        width : '90%',
        marginTop: '5%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        backgroundColor: "#EDECE8",
    },
    contentCatalog:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },
    contentCatalog1:{
        width: '55%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'pink',
        marginRight: '2%'
    },
    contentCatalog2:{
        width: '30%',
        height: '65vh',
    },
    catalogImg: {
        width: '100%'
    },
    subtitle:{
        fontSize: 24,
        marginBottom: '3%'
    },
    caption1:{
        fontSize: 18,
        marginBottom: '2%'
    },
    caption2: {
        fontSize: 16,
    },
    catalogBottom: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width : '90%',
        marginTop: '5%',
    },
    cardCategory:{
        minWidth : '30%',
        minHeight: '65vh',
        marginBottom : '5%',
        marginLeft : '3%',
        marginRight : '3%',
    },
    categoryImg:{
        height: '50vh'
    },
    captionCategory:{
        marginBottom: '5%'
    },
}))

export default function Home (){
    const classes = useStyles()

    const {topProduct} = useSelector((state) => {
        return {
            topProduct: state.reportReducer.topProduct
        }
    })

    React.useEffect(() => {
        dispatch(getTopProduct())
    }, [])

    const dispatch = useDispatch()

    const renderCard = () => {
        return (
            <>
                <Typography className={classes.title}>Produk Terlaris</Typography>
                <div className={classes.topProduct}>
                    {topProduct.map(item =>{
                    return (
                        <Link to={{pathname:'/Produk-Detail', search: `id=${item.id}`, state: {id:`${item.id}`}}} key={item.id} className={classes.link}>
                            <Button>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.media} image={item.image[0] ? item.image[0] : null}/>
                                    <CardContent>
                                        <Typography>{item.name ? item.name : null}</Typography>
                                        <Typography>Rp. {item.price_each ? item.price_each.toLocaleString() : null}</Typography>
                                    </CardContent>
                                </Card>
                            </Button>
                        </Link>
                        )})}
                </div>
            </>
        )
    }

    const renderCatalog = () => {
        return (
            <>
                <Typography className={classes.title}>Inspirasi Katalog</Typography>
                <div className={classes.catalogTop}>
                    <div className={classes.contentCatalog}>
                        <div className={classes.contentCatalog1}>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1598888113_0_0.jpeg" className={classes.catalogImg}/>
                        </div>
                        <div className={classes.contentCatalog2}>
                            <Typography className={classes.subtitle}>
                                Ruang untuk setiap aktivitas dan kebutuhan keluarga
                            </Typography>
                            <Typography className={classes.caption1}>
                                Tinggal di rumah yang terbatas dengan anak-anak dapat terasa nyaman dan efisien jika ditata secara cerdas.
                            </Typography>
                            <Typography className={classes.caption2}>
                                Dengan perabot rumah dan pengaturan yang tepat, selalu ada kemungkinan di setiap bagian rumah Anda untuk mengakomodasi semua kebutuhan dan aktivitas, mulai dari hiburan, makan bersama, ruang kerja instan atau bahkan area bermain.  
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.catalogBottom}>
                    <Card className={classes.cardCategory}>
                        <CardMedia className={classes.categoryImg} image={"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1598888113_0_1.jpeg"}/>
                        <CardContent>
                            <Typography>
                                Ruang keluarga adalah pusat dari semua aktivitas di rumah. Pilih sofa ukuran lebih besar untuk mengakomodasi semua anggota keluarga atau sofa multifungsi dengan penyimpanan luas yang mudah diubah menjadi tempat tidur nyaman
                            </Typography>
                            <Link to={{pathname:'/Produk-Detail'}} className={classes.link}>
                                <Typography>
                                    Lihat koleksi sofa
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                    <Card className={classes.cardCategory}>
                        <CardMedia className={classes.categoryImg} image={"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page_prev_6384_en_us_16009402630.jpeg"}/>
                        <CardContent>
                            <Typography>
                                Sediakan penyimpanan yang mudah mereka gunakan untuk merapikan dan menyimpan mainan dan perlengkapan sekolah mereka. Hadir dalam berbagai ukuran dan dapat menyesuaikan penyimpanan dengan kebutuhan Anda.
                            </Typography>
                            <Link to={{pathname:'/Produk-Detail' }}  className={classes.link}>
                                <Typography>
                                    Lihat koleksi lemari
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                    <Card className={classes.cardCategory}>
                        <CardMedia className={classes.categoryImg} image={"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page_prev__en_us_16010243510.jpeg"}/>
                        <CardContent>
                            <Typography className={classes.captionCategory}>
                                Ciptakan area kerja nyaman dengan menggunakan perabotan dan perlengkapan untuk bekerja di rumah. Kami memiliki meja kerja dalam berbagai gaya dan desain.
                            </Typography>
                            <Link to={{pathname:'/Produk-Detail'}} className={classes.link}>
                                <Typography className={classes.linkCategory}>
                                    Lihat koleksi meja
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </>
        )
    }

    return(
        <div className={classes.root}>
            <CarouselComp/>
            <Paper className={classes.containerProduct}>
                {renderCard()}
            </Paper>
            <Paper className={classes.catalog}>
                {renderCatalog()}
            </Paper>
        </div>
    )
}