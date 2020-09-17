import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {makeStyles, 
        Table, 
        TableBody, 
        TableHead, 
        TableRow, 
        TableCell, 
        TableContainer, 
        Backdrop, 
        CircularProgress, 
        IconButton,
        TextField,
        Dialog,
        DialogActions, DialogContent, DialogContentText, Button} from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

// import action
import {getCart, deleteCart, editCart} from "../action"

const useStyles = makeStyles((theme)=>({
   
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    input:{
        width: "20px",
    }
}))
const Cart = () =>{
    const [editIndex, setEditIndex] = React.useState(null)
    const [qtyEdit, setQtyEdit] = React.useState(0)
    // test stock
    const [stock, setStock] = React.useState(5)
    const [error, setError] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    // import redux
    const {cart, total, loading} = useSelector((state)=>{
        return{
            cart: state.cartReducer.cart,
            total: state.cartReducer.total,
            loading: state.cartReducer.loading
        }
    })

    React.useEffect(()=>{
        dispatch(getCart(13))
    },[])

    const handleEdit = (id, qty)=>{
        setEditIndex(id)
        setQtyEdit(qty)
    }
    const handleDelete = (id, user_id)=>{
        dispatch(deleteCart(id, user_id))
    }
    
    const handleCancel = ()=>{
        setEditIndex(null)
        setQtyEdit(0)
    }

    const handleDone = (item)=>{
        setEditIndex(null)
        setQtyEdit(0)
        const body = {
            user_id: item.user_id,
            qty: qtyEdit
        }
        if(body.qty > stock){
            setError(`Stok yang tersedia saat ini untuk produk ${item.name} hanya ${stock} buah`)
            setOpen(true)
            return
        }
        dispatch(editCart(item.id,body))

    }

    const handleClose=()=>{
        setOpen(false)
    }
    const renderTable = ()=>{
        return cart.map((item)=>{
            return item.id === editIndex? (
                <TableRow key={item.id}>
                    <TableCell>
                        {/* <img src={} alt=""/>                        */}
                        {item.name}</TableCell>
                    <TableCell>Rp. {parseInt(item.price_each).toLocaleString()}</TableCell>
                    <TableCell>
                        <IconButton 
                            disabled={qtyEdit === 1} 
                            onClick={()=>setQtyEdit((prevstate)=>parseInt(prevstate - 1))}>
                            <RemoveIcon/>
                        </IconButton>
                        <TextField 
                            value={qtyEdit} 
                            onChange={(event)=>setQtyEdit(parseInt(event.target.value? event.target.value : 0))}
                            className={classes.input}/>
                        {/* {qtyEdit} */}
                        <IconButton onClick={()=>setQtyEdit((prevstate)=>parseInt(prevstate + 1))}>
                            <AddIcon/>
                        </IconButton>
                        </TableCell>
                    <TableCell>Rp. {(item.price_each * item.qty).toLocaleString()}</TableCell>
                    <TableCell>
                        <IconButton onClick={()=> handleDone(item)}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton onClick={()=> handleCancel()}>
                            <ClearIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                ):
                (
                <TableRow key={item.id}>
                    <TableCell>
                        {/* <img src={} alt=""/>                        */}
                        {item.name}</TableCell>
                    <TableCell>Rp. {parseInt(item.price_each).toLocaleString()}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>Rp. {(item.price_each * item.qty).toLocaleString()}</TableCell>
                    <TableCell>
                        <IconButton onClick={()=> handleEdit(item.id, item.qty)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> handleDelete(item.id, item.user_id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }
    console.log(error)
    return(
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <h1>Cart Page</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produk</TableCell>
                            <TableCell>Harga</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Edit/Hapus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTable()}
                        <TableRow>
                            <TableCell colSpan="3" align="right">Total</TableCell>
                            <TableCell>Rp. {total.toLocaleString()}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog 
                open={open}
                onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Cart