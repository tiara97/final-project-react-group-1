import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper,
    Select,
    MenuItem, 
    Chip
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom';
import {getProduct, getCarousel, getFilterProductCategory, getCategory, getProductCategory} from '../action'

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
    },
    filter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '1%' ,
        paddingRight: '1%' ,
    }
}));

export default function Products({location: {search}}) {
    const classes = useStyles()

    const [categoryName, setCategoryName] = React.useState('All')
    const [chip, setChip] = React.useState([])
    const [sort, setSort] = React.useState('sort')

    const { product, procat, carousel, filterProcat, category } = useSelector((state) => {
        return {
            product: state.productReducer.product,
            carousel: state.carouselReducer.carousel,
            procat: state.productCategoryReducer.procat,
            filterProcat: state.productCategoryReducer.filterProcat,
            category: state.categoryReducer.category
        }
    })
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProduct('product_details'))
        dispatch(getCarousel())
        dispatch(getCategory())
        if(search){
            dispatch(getFilterProductCategory(search ? search.slice(10) : null))
        }
    }, [])

    const filterCategory = () => {
        return (
            <div>
                <Select
                    fullWidth
                    variant="outlined"
                    value={categoryName}
                    onChange={(event) => handleFilter(event)}
                    >
                        <MenuItem value="All">Category</MenuItem>
                {category.map(item => {
                    return (
                        <MenuItem key={item.id} value={item.category}>{item.category}</MenuItem>
                        )
                    })}
                </Select>
            </div>
        )
    }

    const handleFilter = (event) => {
        setCategoryName(event.target.value)
        // check value
        if(event.target.value === 'All') return
        let temp = [...chip]
        let filter = temp.filter(item => item === event.target.value)

        let query = ''
        if(filter.length === 0){
            temp.push(event.target.value)
            setChip(temp)
            temp.forEach(item => query += `category=${item}&`)
            dispatch(getProductCategory(query))
        }
    }

    const renderSort = () => {
        return (
            <div>
                <Select
                    fullWidth
                    variant="outlined"
                    value={sort}
                    onChange={(event) => handleSort(event)}
                    >
                        <MenuItem value='sort'>Urutkan Berdasarkan</MenuItem>
                        <MenuItem value='name,asc'>Nama (A-Z)</MenuItem>
                        <MenuItem value='name,desc'>Nama (Z-A)</MenuItem>
                        <MenuItem value='price,asc'>Harga Terendah</MenuItem>
                        <MenuItem value='price,desc'>Harga Tertinggi</MenuItem>
                </Select>
            </div>
        )
    }

    const handleSort = (event) => {
        let sortBy = ''
        if(event.target.value !== 'sort'){
            let tempArr = event.target.value.split(',')
            sortBy = `_sort=${tempArr[0]}&_order=${tempArr[1]}`
        }
        console.log('sortBy: ', sortBy)
        
        setSort(event.target.value)

        // check query
        let temp = [...chip]
        let query = ''
        temp.forEach(item => query += `category=${item}&`)

        search ? dispatch(getFilterProductCategory(search ? search.slice(10) : null, event.target.value)) : chip.length !== 0 ? 
            dispatch(getProductCategory(query, sortBy)) : dispatch(getProduct('product_details', sortBy))

    }

    const renderChip = () => {
        return (
            <div>
                {
                    chip.map((item, index) => {
                        return (
                            <Chip key = {index} label={item} onDelete={() => handleDelete(index)} />
                        )
                    })
                }
            </div>
        )
    }

    const handleDelete = (id) => {
        let query = ''
        let temp = [...chip]
        temp.splice(id, 1)
        setChip(temp)
        temp.forEach(item => query += `category=${item}&`)
        dispatch(getProductCategory(query))
    }

    const renderCard = () => {
        return (search ? filterProcat : chip.length !== 0 ? procat : product).map(item =>{
            return (
                <Link to={{pathname:'/Produk-Detail', search: `id=${item.id}`, state: {id:`${item.id}`}}} key={item.id} className={classes.link}>
                    <Button>
                        <Card className={classes.card}>
                            <CardMedia className={classes.media} image={item.image? item.image[0] : null}/>
                            <CardContent>
                                <Typography>{item.name ? item.name : null}</Typography>
                                <Typography>Rp. {item.price ? item.price.toLocaleString() : null}</Typography>
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
                <div className={classes.filter}>
                    {filterCategory()}
                    {renderSort()}
                </div>
                {renderChip()}
                <div className={classes.productCard}>
                    {renderCard()}
                </div>
            </Paper>
        </div>
    )
}