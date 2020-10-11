import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeStyles, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer} from "@material-ui/core"

import {getWarehouse, getOngkir} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    }
}))

const Ongkir = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const {ongkir, warehouse} = useSelector((state)=>{
        return{
            ongkir: state.ongkirReducer.ongkir,
            warehouse: state.warehouseReducer.warehouse
        }
    })

    React.useEffect(()=>{
        dispatch(getWarehouse())
        dispatch(getOngkir())
    },[])

    const renderOngkir = ()=>{
        return ongkir.map((item)=>{
            return(
                <TableRow key={item.id}>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>Rp. {item.price.toLocaleString()}</TableCell>
                </TableRow>
            )
        })
    }

    const renderWarehouse = ()=>{
        return warehouse.map((item)=>{
            return(
                <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}, {item.city}, {item.province}</TableCell>
                </TableRow>
            )
        })
    }
    return(
        <div className={classes.root} >
            <Typography variant="h6">Detail Ongkos Kirim</Typography>
            <TableContainer style={{width: "50vw"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Max Berat Barang (kg)</TableCell>
                            <TableCell>Biaya</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderOngkir()}
                    </TableBody>
                </Table>
                <Typography>*Jika barang belanjaan anda lebih dari 100kg, kami akan menerapkan harga Rp.5.000 untuk 1kg selanjutnya.</Typography>
                <Typography>*Cakupan pengiriman dibatasi hingga radius 50 km di dalam lokasi toko.</Typography>
                
                <Typography variant="h6">Daftar Gudang</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama Gudang</TableCell>
                            <TableCell>Alamat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderWarehouse()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Ongkir