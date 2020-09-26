import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button, Typography, IconButton, TextField, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Backdrop, Select, CircularProgress, Chip, Collapse, FormControl, InputLabel, TablePagination } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

import DialogComp from '../component/dialog'
import { URL_IMG } from '../action/helper'
import { getAllOrder, getUserOrder, getOrderByStatus, getOrderByNumber, confirmPayment, rejectPayment, cancelOrder, sendOrder, getWarehouse, getOrderByWarehosue } from '../action'

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

const TableHistory = ({ order, warehouse }) => {
  const [openDialog, setOpenDialog] = React.useState({
    order_number: null,
    payment_note: null,
    open: false,
  });
  const [openDialogCancel, setOpenDialogCancel] = React.useState({
    order_number: null,
    open: false,
  });
  const [open, setOpen] = React.useState({
    index: null,
    open: false,
  })
  const [select, setSelect] = React.useState('')
  const [chipID, setChipID] = React.useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles()
  const dispatch = useDispatch()

  const chips = [
    "Semua",
    "Waiting for payment",
    "Payment success",
    "On delivery",
    "Done",
    "Cancelled"
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
        <TableCell align='center'>Action</TableCell>
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
              <TableCell align='center'>
                {item.status === 'Waiting for payment' ? (
                  <>
                    <DivButton onClick={() => handlePayment(item.payment_note, item.order_number)} children='Check payment' color='primary' />
                    <DivButton onClick={() => handleCancelOrder(item.order_number)} children='Cancel' color='secondary' />
                  </>
                ) : (
                    <>
                      {item.status === 'Payment success' ? (
                        <>
                          <DivButton onClick={() => handleSend(item.order_number)} children='Send' color='primary' />
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
  const handleSend = (order_number) => {
    console.log(order_number)
    dispatch(sendOrder(order_number))
  }
  // open dialog for checking payment
  const handlePayment = (note, order_number) => {
    console.log(note, order_number)
    setOpenDialog({ open: true, payment_note: note, order_number: order_number })
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
    dispatch(rejectPayment(openDialog.order_number))
    setOpenDialog({ open: false, payment_note: null, order_number: null })
  }
  // open dialog for canceling order
  const handleCancelOrder = (order_number) => {
    console.log(order_number)
    setOpenDialogCancel({ open: true, order_number: order_number })
  }
  // cancel order
  const handleCancel = () => {
    console.log(openDialogCancel.order_number)
    dispatch(cancelOrder(openDialogCancel.order_number))
    setOpenDialogCancel({ open: false, order_number: null })
  }
  // open detail for each order
  const handleOpen = (index) => {
    console.log(index)
    console.log(open.open)
    setOpen({ open: !open.open, index: index })
  }
  // filter with chip
  const handleChip = (id) => {
    let status_id = parseInt(id)
    setChipID(id -1)
    if (id === 1) {
      return dispatch(getAllOrder())
    }
    dispatch(getOrderByStatus(status_id))
  }
  // select filter
  const handleSelect = (event) => {
    let id = event.target.value
    console.log(event.target.value)
    setSelect(id);
    if (id == 0) { return dispatch(getAllOrder()) }
    dispatch(getOrderByWarehosue(id))
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
      <Typography>Filter by status : </Typography>
      <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
        {chips.map((item, index) => {
          return (
            <li key={index} style={{ listStyle: 'none' }}>
              {index == chipID ? (
                <ChipStatus label={item} onClick={() => handleChip(index + 1)} color='primary' />
              ) : (
                <ChipStatus label={item} onClick={() => handleChip(index + 1)} />
              )}
            </li>
          )
        })}
      </div>
      <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
        <Typography>Filter by : </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Warehouse</InputLabel>
          <Select
            native
            value={select}
            onChange={handleSelect}
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
      </div>
      <Table>
        {tableHead()}
        {tableBody()}
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      <DialogComp open={openDialog.open} onClose={() => setOpenDialog({ open: false, payment_note: null, order_number: null })}
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
      <DialogComp open={openDialogCancel.open} onClose={() => setOpenDialogCancel({ open: false, payment_note: null, order_number: null })}
        text={
          <>
            <Typography variant='h5'>Warning !</Typography>
            <Typography>Are you sure to cancel Order # {openDialogCancel.order_number} ?</Typography>
          </>
        }
        action={
          <>
            <DivButton onClick={() => handleCancel()} children='Yes, I am sure' color='primary' />
            <DivButton onClick={() => setOpenDialogCancel({ open: false, order_number: null })} children='No' color='secondary' />
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

  const { order, warehouse } = useSelector((state) => {
    return {
      order: state.orderReducer.order,
      warehouse: state.warehouseReducer.warehouse,
    };
  }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getWarehouse());
  }, []);

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
        <TableHistory order={order} warehouse={warehouse} />
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