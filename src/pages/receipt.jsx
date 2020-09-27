import React from "react"
import { Redirect } from "react-router-dom"
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
        CircularProgress,
        Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {getOrderByNumber} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10vh",
        minHeight: "90vh"
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

const Receipt = ({location})=>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const order_number = location.search.slice(1)

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


    const renderOrder = ()=>{
        return order.map((item)=>{
            return(
                <Paper key={item.id} className={classes.paper}>
                    <Typography variant="h6">{item.order_number}</Typography>
                    <Typography variant="h6">Status : Lunas</Typography>
                    <Typography>{item.upload_date}</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama Produk</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Harga</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {item.name.map((produk, index) =>{
                             return(
                             <TableRow>
                                 <TableCell>{produk}</TableCell>
                                 <TableCell>{item.qty[index]} </TableCell>
                                 <TableCell>Rp. {(parseInt(item.price_each[index])).toLocaleString()}</TableCell>
                            </TableRow>)
                    })}
                        <TableRow>
                            <TableCell colSpan={2}>Ongkos Kirim</TableCell>
                            <TableCell>Rp. {item.total_ongkir? parseInt(item.total_ongkir).toLocaleString(): null}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell>Rp.  {item.total_ongkir? (parseInt(item.total) + parseInt(item.total_ongkir)).toLocaleString() : item.total.toLocaleString()}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            )
        })
    }

    return(
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <h1>Receipt Page</h1>
            {renderOrder()}
        </div>
    )
}

export default Receipt