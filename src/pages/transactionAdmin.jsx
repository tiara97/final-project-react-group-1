import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button, Typography, IconButton, TextField, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Backdrop, Select, CircularProgress, Chip, Collapse, FormControl, InputLabel, TablePagination } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

import DialogComp from '../component/dialog'
import { URL_IMG } from '../action/helper'
import { getAllOrder, getUserOrder, getOrderByStatus, getOrderByNumber, confirmPayment, rejectPayment, cancelOrder, sendOrder, getWarehouse, getOrderByWarehouse, getOrderByWarehouseStatus, userKeepLogin } from '../action'

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      key={index}
    >
      { value === index && <Box p={0}>{children}</Box>}
    </div >
  );
}

const TableHistory = ({ order, warehouse, role, id, wh_id }) => {
  const [openDialog, setOpenDialog] = React.useState({
    order_number: null,
    payment_note: null,
    warehouse_id: null,
    open: false,
  });
  const [openDialogCancel, setOpenDialogCancel] = React.useState({
    order_number: null,
    warehouse_id: null,
    open: false,
  });
  const [open, setOpen] = React.useState({
    index: null,
    open: false,
  })
  const [select, setSelect] = React.useState(0)
  const [selectSt, setSelectSt] = React.useState(0)
  const [chipID, setChipID] = React.useState(wh_id)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles()
  const dispatch = useDispatch()

  const chips = [
    "Waiting for payment",
    "Payment success",
    "On delivery",
    "Done",
    "Cancelled",
    "Rejected"
  ];

  const DivButton = (props) => {
    const { onClick, children, icon, color } = props
    return (
      <Button variant="contained" color={color} component="span" size='small'
        startIcon={icon} onClick={onClick}>
        {children}
      </Button>
    )
  }
  const tableHead = () => {
    return (
      <TableRow>
        <TableCell>Order number</TableCell>
        <TableCell>User ID</TableCell>
        <TableCell>Order Date</TableCell>
        <TableCell>Required Date</TableCell>
        <TableCell>User Payment Date</TableCell>
        <TableCell>Send Date</TableCell>
        <TableCell>Total (Rp)</TableCell>
        <TableCell>Warehouse</TableCell>
        <TableCell>Status</TableCell>
        {role === 1 ? (
          <TableCell align='center'>Action</TableCell>
        ) : (
            null
          )}
        <TableCell></TableCell>
      </TableRow>
    );
  };
  const tableBody = () => {
    return (
      order.map((item, index) => {
        return (
          <TableBody>
            <TableRow key={index}>
              <TableCell>{item.order_number}</TableCell>
              <TableCell>{item.user_id}</TableCell>
              <TableCell>{item.order_date.slice(0, 10)}</TableCell>
              <TableCell>{item.required_date ? item.required_date.slice(0, 10) : ''}</TableCell>
              <TableCell>{item.upload_date ? item.upload_date.slice(0, 10) : ''}</TableCell>
              <TableCell>{item.send_date ? item.send_date.slice(0, 10) : ''}</TableCell>
              <TableCell>{item.total.toLocaleString()}</TableCell>
              <TableCell>{item.warehouse}</TableCell>
              <TableCell>{item.status}</TableCell>
              {role === 1 ? (
                <TableCell align='center'>
                  {item.status === 'Waiting for payment' ? (
                    <>
                      <DivButton onClick={() => handlePayment(item.payment_note, item.order_number, item.warehouse_id)} children='Check payment' color='primary' />
                      <DivButton onClick={() => handleCancelOrder(item.order_number, item.warehouse_id)} children='Cancel order' color='secondary' />
                    </>
                  ) : (
                      <>
                        {item.status === 'Payment success' ? (
                          <>
                            <DivButton onClick={() => handleSend(item.order_number, item.warehouse_id)} children='Send' color='primary' />
                            <Button variant="outlined" color="primary" component={Link} to='/Produk-Admin'>
                              Check stock
                          </Button>
                          </>
                        ) : (
                            <></>
                          )}
                      </>
                    )}
                </TableCell>
              ) : (
                  null
                )}
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => handleOpen(index)}>
                  {open.open && open.index === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open.open && open.index === index} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Details
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Color</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Total price (Rp)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.image.length > 1 ? (
                          item.image.map((value, ind) => {
                            return (
                              <TableRow key={ind}>
                                <TableCell component="th" scope="row">
                                  {item.name[ind]}
                                </TableCell>
                                <TableCell>{item.color[ind]}</TableCell>
                                <TableCell align="right">{item.qty[ind]}</TableCell>
                                <TableCell align="right">
                                  {(item.qty[ind] * item.price_each[ind]).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                              <TableCell>{item.color}</TableCell>
                              <TableCell align="right">{item.qty}</TableCell>
                              <TableCell align="right">
                                {(item.qty * item.price_each).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          )}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      })
    )
  };

  // send order to user
  const handleSend = (order_number, warehouse_id) => {
    console.log(order_number, warehouse_id)
    const body = {wh_id : warehouse_id}
    console.log(body)
    dispatch(sendOrder(order_number, body))
  }
  // open dialog for checking payment
  const handlePayment = (note, order_number, warehouse) => {
    console.log(note, order_number, warehouse)
    setOpenDialog({ open: true, payment_note: note, order_number: order_number, warehouse_id: warehouse})
  }
  // payment success confirmation
  const handleConfirmPay = () => {
    console.log(openDialog.order_number)
    dispatch(confirmPayment(openDialog.order_number))
    setOpenDialog({ open: false, payment_note: null, order_number: null })
  }
  // reject order because user did not pay within time limit
  const handleRejectPay = () => {
    console.log(openDialog.order_number)
    const body = {wh_id : openDialog.warehouse_id}
    console.log(body)
    dispatch(rejectPayment(openDialog.order_number, body))
    setOpenDialog({ open: false, payment_note: null, order_number: null, warehouse_id:null })
  }
  // open dialog for canceling order
  const handleCancelOrder = (order_number, warehouse) => {
    console.log(order_number, warehouse)
    setOpenDialogCancel({ open: true, order_number: order_number, warehouse_id: warehouse})
  }
  // cancel order
  const handleCancel = () => {
    console.log(openDialogCancel.order_number)
    const body = {wh_id : openDialogCancel.warehouse_id}
    console.log(body)
    dispatch(cancelOrder(openDialogCancel.order_number, body))
    setOpenDialogCancel({ open: false, order_number: null, warehouse_id:null })
  }
  // open detail for each order
  const handleOpen = (index) => {
    console.log(index)
    console.log(open.open)
    setOpen({ open: !open.open, index: index })
  }
  // select filter warehouse
  const handleSelectWh = (event) => {
    let id = event.target.value
    console.log(event.target.value)
    setSelect(id);
    if (id == 0) { return dispatch(getAllOrder()) }
    dispatch(getOrderByWarehouse(id))
  };
  // select filter status
  const handleSelectSt = (event) => {
    console.log(wh_id)
    let status_id = parseInt(event.target.value)
    console.log(event.target.value)
    const body = { order_status_id: status_id }
    setSelectSt(status_id);
    if (role === 1) {
      if (status_id === 0) {
        return dispatch(getAllOrder())
      }
      dispatch(getOrderByStatus(status_id))
    } else {
      if (status_id === 0) {
        return dispatch(getOrderByWarehouse(wh_id))
      }
      dispatch(getOrderByWarehouseStatus(wh_id, body))
    }
  };
  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
        <Typography>Filter by : </Typography>
        {role === 1 ? (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Warehouse</InputLabel>
            <Select
              style={{marginRight: 10}}
              native
              value={select}
              onChange={handleSelectWh}
              label="Warehouse"
              inputProps={{
                name: 'Warehouse',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" label='All' value={0} />
              {warehouse.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{item.name}</option>
                )
              })}
            </Select>
          </FormControl>
        ) : (
            null
          )}
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              value={selectSt}
              onChange={handleSelectSt}
              label="Status"
              inputProps={{
                name: 'Status',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" label='All' value={0} />
              {chips.map((item, index) => {
                return (
                  <option key={index} value={index + 2}>{item}</option>
                )
              })}
            </Select>
          </FormControl>
      </div>
      <Table>
        {tableHead()}
        {tableBody()}
      </Table>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={order.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
      <DialogComp open={openDialog.open} onClose={() => setOpenDialog({ open: false, payment_note: null, order_number: null, warehouse_id:null })}
        text={
          <>
            <Typography>Payment Confirmation # {openDialog.order_number}</Typography>
            <div className={classes.avatar}>
              <img src={openDialog.payment_note ? URL_IMG + openDialog.payment_note : ''} width="100%" alt={"payment-note-" + openDialog.order_number}></img>
            </div>
            <Typography>Confirm this ?</Typography>
          </>
        }
        action={
          <>
            <DivButton onClick={() => handleConfirmPay()} children='Confirm' color='primary' />
            <DivButton onClick={() => handleRejectPay()} children='Reject' color='secondary' />
          </>
        } />
      <DialogComp open={openDialogCancel.open} onClose={() => setOpenDialogCancel({ open: false, order_number: null, warehouse_id:null })}
        text={
          <>
            <Typography variant='h5'>Warning !</Typography>
            <Typography>Are you sure to cancel Order # {openDialogCancel.order_number} ?</Typography>
          </>
        }
        action={
          <>
            <DivButton onClick={() => handleCancel()} children='Yes, I am sure' color='primary' />
            <DivButton onClick={() => setOpenDialogCancel({ open: false, order_number: null, warehouse_id:null })} children='No' color='secondary' />
          </>
        } />
    </div>
  )
}

const ChipStatus = (props) => {
  const classes = useStyles();
  const { label, onClick, color } = props
  return (
    <Chip className={classes.orderChip} label={label} onClick={onClick} color={color} />
  )
}

const TransactionAdmin = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let wh_id

  const { order, warehouse, role, id } = useSelector((state) => {
    return {
      order: state.orderReducer.order,
      warehouse: state.warehouseReducer.warehouse,
      role: state.userReducer.role,
      id: state.userReducer.id,
    };
  }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getWarehouse());
    dispatch(getAllOrder())
    console.log(role, id)
  }, []);

  warehouse.forEach((item, index)=> {
        if(item.admin_id == id) {
          wh_id = item.id
        } 
      })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography>Transaction Admin Page</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="History" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableHistory order={order} warehouse={warehouse} role={role} id={id} wh_id={wh_id} />
      </TabPanel>
    </div>
  );
}
export default TransactionAdmin

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: "10vh",
  },
  inputStock: {
    width: '20%'
  },
  orderChip: {
    marginLeft: 10
  },
  avatar: {
    height: '400px',
    width: '400px',
    // marginBottom: 5,
    // marginTop: 5,
  },
  buttonDialog: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));