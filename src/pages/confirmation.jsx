import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeStyles, 
        Paper, 
        Typography, 
        Accordion, 
        AccordionSummary, 
        AccordionDetails,
        List,
        ListItem,
        ListItemText,
        Button,
        Backdrop, 
        CircularProgress, } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PhotoCamera from "@material-ui/icons/PhotoCamera"

import DialogComp from "../component/dialog"

import {getOrderByNumber, uploadPayment} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    },
    accordion:{
        boxShadow: "none",
        margin: 0
    },
    paper:{
        padding: 20
    },
    input: {
        display: 'none',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}))

const Confirmation = ({location: {search}})=>{
    const [openDialog, setOpenDialog] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const order_number = search.slice(1)

    const {order, error, loading} = useSelector((state)=>{
        return{
            loading: state.orderReducer.loading,
            order: state.orderReducer.order,
            error: state.orderReducer.errorUpload
        }
    })
    React.useEffect(()=>{
        console.log(order_number)
        if(order_number){
            dispatch(getOrderByNumber(order_number))
        }
    },[])

    const handleUpload = (props) => {
        let fileProps = props.target.files[0]
        console.log(fileProps)
        let data = new FormData()
        data.append('IMG', fileProps)
        console.log(data)
        dispatch(uploadPayment(order_number,data))
        setOpenDialog(true)
    };

    const handleClose = () =>{
        setOpenDialog(false)
    }

    const renderOrder = ()=>{
        return order.map((item)=>{
            return(
                <Paper key={item.id} className={classes.paper}>
                    <Typography variant="h6">{item.order_number}</Typography>
                    <Accordion
                        className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Produk</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {item.name.map((produk, index) =>{
                                    return(<ListItem>
                                        <ListItemText>{produk} {item.qty[index]} Rp. {(parseInt(item.price_each[index])).toLocaleString()}</ListItemText>
                                    </ListItem>)
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Typography>Total Harga : Rp. {item.total.toLocaleString()}</Typography>
                    <Typography>Total Ongkir : Rp. {item.total_ongkir? item.total_ongkir.toLocaleString(): null}</Typography>
                    <Typography>
                        Total yang harus dibayar : Rp. 
                        {item.total_ongkir? (item.total + item.total_ongkir).toLocaleString() : item.total.toLocaleString()}
                    </Typography>
                    <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleUpload}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span"
                                startIcon={<PhotoCamera />}>
                                Upload
                                </Button>
                        </label>
                    <DialogComp
                        open={openDialog}
                        onClose={handleClose}
                        text={error? error : "Bukti pembayaran berhasil di upload!"}
                        action={<Button
                            onClick={handleClose}>
                            Ok
                        </Button>}
                        />
                </Paper>
            )
        })
    }

    return(
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <h1>Confirmation Page</h1>
            {renderOrder()}
        </div>
    )
}

export default Confirmation