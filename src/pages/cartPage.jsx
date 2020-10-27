import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link, Redirect} from "react-router-dom"
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
import {getCart, deleteCart, editCart, deleteError, URL_IMG} from "../action"

const useStyles = makeStyles((theme)=>({
   
    root:{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh",
        minHeight: "90vh",
        paddingLeft: "10vw",
        paddingRight: "10vw"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    input:{
        width: "20px",
    },
    button:{
        borderRadius: 0,
    },
    product:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
}))

const Cart = () =>{
    const [editIndex, setEditIndex] = React.useState(null)
    const [delIndex, setDelIndex] = React.useState(null)
    const [qtyEdit, setQtyEdit] = React.useState(0)
    const [openDel, setOpenDel] = React.useState(false)
    const [checkOut, setCheckout] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    // import redux
    const {cart, total, loading, errorCart, id, errorQty} = useSelector((state)=>{
        return{
            cart: state.cartReducer.cart,
            errorQty: state.cartReducer.errorQty,
            total: state.cartReducer.total,
            loading: state.cartReducer.loading,
            errorCart: state.cartReducer.error,
            id: state.userReducer.id
        }
    })
    const Color = ({ code, onPress, border = 0 }) => {
        return (
            <div
                onClick={onPress}
                style={
                    {
                        backgroundColor: code,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        marginRight: '2%',
                        border: `black solid ${border}px`
                    }}>
            </div>
        )
    }
    
    const color = [
        { id: 1, name: 'Black', code: '#2d3436' }, { id: 2, name: 'White', code: '#f5f5f5' }, { id: 3, name: 'Natural', code: '#dfe4ea' },
        { id: 4, name: 'Blue', code: '#3742fa' }, { id: 5, name: 'Green', code: '#2ed573' }, { id: 6, name: 'Red', code: '#EA2027' }
    ]

    React.useEffect(()=>{
        if(id){
            dispatch(getCart(id))
        }
    },[])

    const handleEdit = (id, qty)=>{
        setEditIndex(id)
        setQtyEdit(qty)
    }

    const handleOpenDel = (index)=>{
        setDelIndex(index)
        setOpenDel(true)
    }
    const handleDelete = ()=>{
        dispatch(deleteCart(delIndex, id))
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
          
            const renderColor = () => {
                return color.map((value) => {
                    if(item.color === value.name){
                        return (
                            <Color
                                key={value.id}
                                code={value.code}
                            />
                        )
                    }
                    
                })
            }
             return (
             <TableRow key={item.id}>
                    <TableCell className={classes.product}>
                        <img src={item.image} width="100px" alt="product-image"/>   
                        <Typography>{item.name}</Typography>
                        <Typography color="secondary"> {item.error? `*${item.error}` : null}</Typography>               
                     </TableCell>
                    <TableCell align="center">
                        <div style={{ width: '100%', display: 'flex' }}>
                          {renderColor()}
                        </div>
                    </TableCell>
                    <TableCell align="center">Rp. {parseInt(item.price_each).toLocaleString()}</TableCell>
                    {item.id === editIndex? (
                         <TableCell align="center">
                         <IconButton 
                             disabled={qtyEdit === 1} 
                             onClick={()=>setQtyEdit((prevstate)=>parseInt(prevstate - 1))}>
                             <RemoveCircleOutlineOutlinedIcon/>
                         </IconButton>
                         <TextField 
                             value={qtyEdit} 
                             onChange={(event)=>setQtyEdit(parseInt(event.target.value? event.target.value : 1))}
                             className={classes.input}/>
                         <IconButton onClick={()=>setQtyEdit((prevstate)=>parseInt(prevstate + 1))}>
                             <AddIcon/>
                         </IconButton>
                         </TableCell>
                    ) : ( <TableCell align="center">{item.qty}</TableCell>)}
                   
                    <TableCell align="center">Rp. {(item.price_each * item.qty).toLocaleString()}</TableCell>
                    {item.id === editIndex?(
                        <TableCell align="center">
                        <IconButton onClick={()=> handleDone(item)}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton onClick={()=> handleCancel()}>
                            <ClearIcon/>
                        </IconButton>
                    </TableCell>
                    ):(  <TableCell align="center">
                        <IconButton onClick={()=> handleEdit(item.id, item.qty)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> handleOpenDel(item.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>)}
                    <DialogComp
                        open={openDel}
                        onClose={handleCloseDel}
                        text={"Anda yakin akan menghapus produk ini?"}
                        action={
                            <>
                            <Button
                                onClick={handleDelete}>
                                Ya
                            </Button>
                            <Button
                                onClick={handleCloseDel}>
                                Tidak
                            </Button>
                            </>}/>
                </TableRow>
                )
        })) : (
        <TableRow>
            <TableCell colSpan="5" align="center">
                <Typography variant="body1">Keranjang belanja anda kosong</Typography>
            </TableCell>
        </TableRow>
        )
    }

    if(checkOut){
        return <Redirect to="/Checkout"/>
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
                            <TableCell align="center">Produk</TableCell>
                            <TableCell align="center">Warna</TableCell>
                            <TableCell align="center">Harga</TableCell>
                            <TableCell align="center">Jumlah</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Edit/Hapus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTable()}
                        {cart.length > 0? (
                        <TableRow>
                            <TableCell colSpan="4" align="right">Total</TableCell>
                            <TableCell align="center">Rp. {total.toLocaleString()}</TableCell>
                            <TableCell align="center">
                                
                                    <Button
                                        disabled={errorQty}
                                        onClick={()=> setCheckout(true)}
                                        className={classes.button}
                                        variant="contained" 
                                        color="primary">
                                        Checkout
                                    </Button>
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
                        className={classes.button}
                        variant="contained"
                        onClick={handleClose}>
                        Tutup
                    </Button>
                 }/>
        </div>
    )
}

export default Cart