import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
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
        Button,
        Typography} from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

import DialogComp from "../component/dialog"

// import action
import {getCart, deleteCart, editCart, deleteError} from "../action"

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
    const [openDel, setOpenDel] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    // import redux
    const {cart, total, loading, errorCart, id} = useSelector((state)=>{
        return{
            cart: state.cartReducer.cart,
            total: state.cartReducer.total,
            loading: state.cartReducer.loading,
            errorCart: state.cartReducer.error,
            id: state.userReducer.id
        }
    })
    

    React.useEffect(()=>{
        if(id){
            dispatch(getCart(id))
        }
    },[])

    const handleEdit = (id, qty)=>{
        setEditIndex(id)
        setQtyEdit(qty)
    }
    const handleDelete = (id, user_id)=>{
        dispatch(deleteCart(id, user_id))
        setOpenDel(false)
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
            qty: qtyEdit,
            color_id: item.color_id
        }
        dispatch(editCart(item.id,body))
       
    }

    const handleClose=()=>{
        dispatch(deleteError())
    }
    const handleCloseDel=()=>{
        setOpenDel(false)
    }

    const renderTable = ()=>{

        return cart.length > 0? (cart.map((item)=>{
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
                            <RemoveCircleOutlineOutlinedIcon/>
                        </IconButton>
                        <TextField 
                            value={qtyEdit} 
                            onChange={(event)=>setQtyEdit(parseInt(event.target.value? event.target.value : 1))}
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
                (<>
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
                        <IconButton onClick={()=> setOpenDel(true)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <DialogComp
                    open={openDel}
                    onClose={handleCloseDel}
                    text={"Anda yakin akan menghapus produk ini?"}
                    action={
                        <>
                        <Button
                            onClick={()=>handleDelete(item.id, item.user_id)}>
                            Ya
                        </Button>
                        <Button
                            onClick={handleCloseDel}>
                            Tidak
                        </Button>
                        </>}/>
             </>
            )
        })) : (
        <TableRow>
            <TableCell colSpan="5" align="center">
                <Typography variant="body1">Keranjang belanja anda kosong</Typography>
            </TableCell>
        </TableRow>
        )
    }

    
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
                        {cart.length > 0? (
                        <TableRow>
                            <TableCell colSpan="3" align="right">Total</TableCell>
                            <TableCell>Rp. {total.toLocaleString()}</TableCell>
                            <TableCell>
                                <Link to="/Checkout">
                                    <Button
                                        variant="contained" 
                                        color="primary">
                                        Checkout
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>) 
                        :(null)}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogComp
                 open={errorCart? true : false}
                 onClose={handleClose}
                 text={errorCart}
                 action={
                    <Button
                        onClick={handleClose}>
                        Tutup
                    </Button>
                 }/>
        </div>
    )
}

export default Cart