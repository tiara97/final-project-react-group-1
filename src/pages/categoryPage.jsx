import React from "react"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {Typography, makeStyles, Card, CardContent, CardMedia, Grow} from "@material-ui/core"
import { getCarousel, getCategory } from "../action"

const useStyles = makeStyles(()=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    },
   cardContainer: {
       display: "flex",
       justifyContent: "space-evenly",
       flexDirection: "row",
       flexWrap: "wrap" ,
   },
   card:{
       width: "45vw",
       height: "70vh",
       marginBottom: "2vh",
       marginTop: "2vh", 
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
    //    alignItems: "center"
   },
   media:{
       flexGrow: 1
   },
   link:{
    textDecoration: "none",
    color: "#000"
  },
  content:{
      position: "absolute",
      color: "inherit"
  }
}))

const Category = () =>{
    const [checked, setChecked] = React.useState(true)
    const classes = useStyles()
    const {carousel,category} = useSelector((state)=>{
        return{
            carousel: state.carouselReducer.carousel,
            category: state.categoryReducer.category
        }
    })

    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(getCarousel())
        dispatch(getCategory())
    },[])

    const renderCard = ()=>{
        return category.map((item)=>{
            return(
                <Link to={{pathname:'/Produk', search: `category=${item.category}`, state: {id:`${item.id}`}}} className={classes.link} key={item.id}>
                    <Grow in={checked}  {...(checked ? { timeout: 1000 } : {})}>
                        <Card className={classes.card} >
                            <CardContent className={classes.content} >
                                <Typography variant="h6" color="inherit">{item.category}</Typography>
                            </CardContent>
                            <CardMedia
                                className={classes.media}
                                image={carousel[item.id].image}/>
                        </Card>
                    </Grow>
                </Link>
            )
        })
    } 
    return(
        <div className={classes.root}>
            <Typography variant="h4">Category Page</Typography>
            <div className={classes.cardContainer} >
                {renderCard()}
            </div>
    
        </div>
    )
}

export default Category