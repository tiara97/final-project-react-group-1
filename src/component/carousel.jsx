import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {getCarousel} from "../action"

const CarouselComp = ()=>{
    const {carousel} = useSelector((state)=>{
        return{
            carousel: state.carouselReducer.carousel
        }
    })
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getCarousel())
    },[])

    const renderCarousel = ()=>{
        return carousel.map((item)=>{
            return(
                <div style={{backgroundImage: `url(${item.image})`, ...styles.carousel}} key={item.id}>
                </div>
            )
        })
    }
    return(
        <div style={styles.container} >
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
    )
}

const styles ={
    container:{
        height: "auto",
        width: "100vw",
    },
    carousel:{
        height: "70vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center"
        }
}

export default CarouselComp