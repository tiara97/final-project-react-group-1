import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorIcon from "@material-ui/icons/Error";
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch } from "react-redux";
import {
  getProductByTable,
  getProduct,
  getProductColor,
  getWarehouse,
  getProductWarehouse,
  editProduct,
  editProductImage,
  editProductStock,
  deleteProduct,
  deleteProductImage,
  deleteProductStock,
  transferStock,
  addProduct,
  addProductImage,
  addProductStock,
  getCategory,
  getCategoryByWarehouse,
  addCategory,
  editCategory,
  deleteCategory,
  getProductCategory,
  addProductCategory,
  editProductCategory,
  deleteProductCategory
} from "../action";

const TableProducts = ({ product, productWarehouse, filterWarehouse, loading, errorAdd , dispatch}) => {
  const [editId, setEditId] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [desc, setDesc] = React.useState("");
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [material, setMaterial] = React.useState("");
  const [add, setAdd] = React.useState({
    open: false
  })

  const renderAddProducts = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '40vw', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>Name</InputLabel>
          <TextField
            error = {errorAdd ? true : false}
            id = "Name"
            fullWidth
            variant = "outlined"
            onChange={(event) => setName(event.target.value)}
            />
        </div>
        <div style={{display: 'flex', width: "80%", justifyContent: 'center', alignItems: 'space-between', marginBottom: '2%'}}>
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Height" shrink>Height</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Height"
              fullWidth
              variant = "outlined"
              onChange={(event) => setHeight(event.target.value)}
              />
          </div>
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Length" shrink>Length</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Length"
              fullWidth
              variant = "outlined"
              onChange={(event) => setLength(event.target.value)}
              />
          </div>
        </div>
        <div style={{display: 'flex', width: "80%", justifyContent: 'center', alignItems: 'space-between', marginBottom: '2%'}}>
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Width" shrink>Width</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Width"
              fullWidth
              variant = "outlined"
              onChange={(event) => setWidth(event.target.value)}
              />
          </div>
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Weight" shrink>Weight</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Weight"
              fullWidth
              variant = "outlined"
              onChange={(event) => setWeight(event.target.value)}
              />
          </div>
        </div>
        <div style={{display: 'flex', width: "80%", justifyContent: 'center', alignItems: 'space-between', marginBottom: '2%'}}>
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Price" shrink>Price</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Price"
              fullWidth
              variant = "outlined"
              onChange={(event) => setPrice(event.target.value)}
              />
          </div>  
          <div style={{marginRight: '3%', flexGrow: 1}}>
            <InputLabel htmlFor="Material" shrink>Material</InputLabel>
            <TextField
              error = {errorAdd ? true : false}
              id ="Material"
              fullWidth
              variant = "outlined"
              onChange={(event) => setMaterial(event.target.value)}
              />
          </div>
        </div>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Desc" shrink>Desc</InputLabel>
          <TextField
            id ="Desc"
            error = {errorAdd ? true : false}
            multiline
            rows={4}
            fullWidth
            variant = "outlined"
            onChange={(event) => setDesc(event.target.value)}
          />
        </div>
        <Typography style={{color: 'red', fontSize: 12, margin: '0 10px'}}>{errorAdd ? errorAdd : ''}</Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(addProduct({ name, height, length, width, weight, price, material, desc }))}
        >
          Submit
        </Button>
      </div>
    )
  }

  const tableHeadProducts = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Desc</TableCell>
        <TableCell>Height</TableCell>
        <TableCell>Width</TableCell>
        <TableCell>Length</TableCell>
        <TableCell>Weight</TableCell>
        <TableCell>Material</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  const tableBodyProducts = () => {
    return (productWarehouse.length !== 0 ? productWarehouse.product : product).map((item) => {
      return item.id === editId ? (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={length}
              onChange={(event) => setLength(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <IconButton 
              onClick={() => {
                    dispatch(editProduct(item.id, { name, price, desc, height, width, length, weight, material}));
                    setEditId(null);
              }}>
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => setEditId(null)}>
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{item.desc}</TableCell>
          <TableCell>{item.height}</TableCell>
          <TableCell>{item.width}</TableCell>
          <TableCell>{item.length}</TableCell>
          <TableCell>{item.weight}</TableCell>
          <TableCell>{item.material}</TableCell>
          <TableCell>
            <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => setEditId(item.id)}>
              <EditIcon />
            </IconButton>
            <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => dispatch(deleteProduct(item.id))}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button
        variant = "contained"
        disabled = {filterWarehouse !== 'All'}
        startIcon={<AddIcon/>}
        onClick = {() => {
              setAdd({open: true})
              dispatch(getProduct('only_product'))}}
      >
        Add Products
      </Button>
      <Dialog
        open={add.open}
        maxWidth="xl"
        onClose={() => setAdd({ open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Products</DialogTitle>
        <DialogContent>{renderAddProducts()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAdd({ open: false })}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>{tableHeadProducts()}</TableHead>
        <TableBody>{tableBodyProducts()}</TableBody>
      </Table>
    </>
  );
};

const TableProductImage = ({ product, productByTable, productWarehouse, filterWarehouse, dispatch }) => {
  const [dialog, setDialog] = React.useState({
    id: null,
    open: false,
    type: ''
  });
  const [editDialog, setEditDialog] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [add, setAdd] = React.useState({
    open: false,
  });
  const [name, setName] = React.useState(1)
  const [imgAdd, setImgAdd] = React.useState("")

  const renderAddProductImage = () => {
    return (
      <div style={{display: 'flex', width: '30vw', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <div>
          <InputLabel htmlFor="product-name">Product Name</InputLabel>
          <Select
            id="product-name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            {product.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
              )
            })}
          </Select>
        </div>
        <div>
          <InputLabel htmlFor="url-image" shrink>URL Image</InputLabel>
          <TextField
            id ="url-image"
            variant = "outlined"
            onChange={(event) => setImgAdd(event.target.value)}
          />
        </div>
        <div>
          <Button
            variant = "contained"
            onClick = {() => {
              dispatch(addProductImage({product_id: name, image: imgAdd }))
              setAdd({open: false})
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }

  const tableHeadProductImage = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  const tableBodyProductImage = () => {
    return (productWarehouse.length !== 0 ? productWarehouse.product : product).map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <img src={item.image ? item.image[0] : null} width="100px" alt="product-image" />
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              disabled = {filterWarehouse !== 'All'}
              color="primary"
              startIcon={<ErrorIcon />}
              onClick={() => setDialog({ id: item.id, open: true, type: 'edit' })}
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderDetails = () => {
    const data = productByTable.filter((item) => item.product_id === dialog.id);
    return (
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>URL Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dialog.id !== null
            ? data.map((item, index) => {
                return item.id === editDialog ? (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={item.image} width="100px" alt="product-image" />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton 
                        onClick={() => {
                              dispatch(editProductImage(dialog.id, { id: item.id, image }));
                              setEditDialog(null)
                      }}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditDialog(null)}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={item.image} width="100px" alt="product-image" />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.image}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton onClick={() => setEditDialog(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => {
                        dispatch(deleteProductImage(item.id))
                        if(item.id === null) setDialog({ id: null, open: false, type: '' })}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <Button
        variant = "contained"
        disabled = {filterWarehouse !== 'All'}
        startIcon={<AddIcon/>}
        onClick = {() => setDialog({id: null, open: true, type: 'add' })}
      >
        Add Product Image
      </Button>
      <Table>
        <TableHead>{tableHeadProductImage()}</TableHead>
        <TableBody>{tableBodyProductImage()}</TableBody>
      </Table>
      <Dialog
        open={dialog.open}
        maxWidth="xl"
        onClose={() => {
          setDialog({ id: null, open: false, type: '' })
          setEditDialog(null)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.type === 'add' ? 'Add Product Image' : 'Detail Image'}</DialogTitle>
        <DialogContent>{dialog.type === 'add' ? renderAddProductImage() : renderDetails()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ id: null, open: false, type: ''  })
              setEditDialog(null)}}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TableProductStock = ({ product, productByTable, productWarehouse, productColor, filterWarehouse, warehouse , classes, dispatch }) => {
  const [dialog, setDialog] = React.useState({
    id: null,
    open: false,
    type: ''
  });
  const [editDialog, setEditDialog] = React.useState(null);
  const [name, setName] = React.useState(1);
  const [color, setColor] = React.useState(1);
  const [warehouseId, setWarehouseId] = React.useState(1);
  const [stockAvailable, setStockAvailable] = React.useState(0);
  const [stockOrdered, setStockOrdered] = React.useState(0);
  const [fromWarehouse, setFromWarehouse] = React.useState(1)
  const [toWarehouse, setToWarehouse] = React.useState(1)
  const [quantityTf, setQuantityTf] = React.useState(1)

  const renderAdd = () => {
    return (
      <div style={{display: 'flex', width: '50vw', alignItems: 'center'}}>
        <div style={{width: '25%', marginRight: '1%'}}>
          <InputLabel shrink>Name</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            >
            {productByTable.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                )
              })}
          </Select>
        </div>
        <div style={{width: '25%', marginRight: '1%'}}>
          <InputLabel shrink>Color</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            >
            {productColor.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.color}</MenuItem>
                )
              })}
          </Select>
        </div>
        <div style={{width: '25%', marginRight: '1%'}}>
          <InputLabel shrink>Warehouse</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={warehouseId}
            onChange={(event) => setWarehouseId(event.target.value)}
          >
            {warehouse.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                )
              })}
          </Select>
        </div>
        <div style={{width: '25%', marginRight: '1%'}}>
          <InputLabel shrink>Stock Available</InputLabel>
          <TextField
            fullWidth
            value={stockAvailable}
            onChange={(event) =>
              setStockAvailable(event.target.value)
            }
            variant="outlined"
            />
        </div>
        <div style={{width: '25%', marginRight: '1%'}}>
          <InputLabel shrink>Stock Ordered</InputLabel>
          <TextField
            fullWidth
            value={stockOrdered}
            onChange={(event) =>
              setStockOrdered(event.target.value)
            }
            variant="outlined"
          />
        </div>
        <div>
          <Button
            variant = "contained"
            onClick = {() => dispatch(addProductStock({product_id: name, color_id: color, warehouse_id: warehouseId, stock_available: stockAvailable, stock_ordered: stockOrdered}))}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }

  const tableHeadProductStock = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Total Stock Available</TableCell>
        <TableCell>Total Stock Ordered</TableCell>
        <TableCell>Total Stock Operational</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  const tableBodyProductStock = () => {
    return (productWarehouse.length !== 0 ? productWarehouse.product : product).map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.total_stock_available}</TableCell>
          <TableCell>{item.total_stock_ordered}</TableCell>
          <TableCell>{item.total_stock_operational}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ErrorIcon />}
              onClick={() => setDialog({ id: item.id, open: true, type: 'Details' })}
            >
              Details
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled = {filterWarehouse !== 'All'}
              startIcon={<SendIcon />}
              onClick={() => toTransferStock(item.id)}
            >
              Transfer
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderDetails = () => {
    const details = dialog.id ? productByTable.filter((item) => item.product_id === dialog.id) : null;
    const detailsByWarehouse = dialog.id ? productByTable.filter((item) => item.product_id === dialog.id && item.warehouse_id === filterWarehouse) : null;
    return (
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Warehouse</TableCell>
            <TableCell>Stock Available</TableCell>
            <TableCell>Stock Ordered</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dialog.id !== null
            ? (filterWarehouse !== 'All' ? detailsByWarehouse : details).map((item, index) => {
                return item.id === editDialog ? (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                        <Select
                          variant="outlined"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        >
                          {product.map(item => {
                            return (
                              <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                            )
                          })}
                        </Select>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Select
                          variant="outlined"
                          value={color}
                          onChange={(event) => setColor(event.target.value)}
                        >
                          {productColor.map(item => {
                            return (
                              <MenuItem key = {item.id} value={item.id}>{item.color}</MenuItem>
                            )
                          })}
                        </Select>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Select
                          variant="outlined"
                          value={warehouseId}
                          onChange={(event) => setWarehouseId(event.target.value)}
                        >
                          {warehouse.map(item => {
                            return (
                              <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                            )
                          })}
                        </Select>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        disabled = {stockAvailable === 1}
                        onClick = {() => setStockAvailable((prev) => parseInt(prev - 1))}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                      <TextField
                        value={stockAvailable}
                        onChange={(event) =>
                          setStockAvailable(event.target.value)
                        }
                        variant="outlined"
                        className={classes.inputStock}
                      />
                      <IconButton
                        onClick = {() => setStockAvailable((prev) => parseInt(prev + 1))}
                      >
                        <AddIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        disabled = {stockOrdered <= 1}
                        onClick = {() => setStockOrdered((prev) => parseInt(prev - 1))}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                      <TextField
                        value={stockOrdered}
                        onChange={(event) =>
                          setStockOrdered(event.target.value)
                        }
                        variant="outlined"
                        className={classes.inputStock}
                      />
                      <IconButton
                        onClick = {() => setStockOrdered((prev) => parseInt(prev + 1))}
                      >
                        <AddIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton 
                          onClick={() => {
                            dispatch(editProductStock(item.id, {product_id: name, color_id: color, warehouse_id: warehouseId, stock_available: stockAvailable, stock_ordered: stockOrdered}))
                            setEditDialog(null);
                      }}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditDialog(null)}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.warehouse_name}</TableCell>
                    <TableCell>{item.stock_available}</TableCell>
                    <TableCell>{item.stock_ordered}</TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => handleEdit(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => dispatch(deleteProductStock(item.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    );
  };

  const handleEdit = (id) => {
    setName(productByTable[id-1].product_id)
    setColor(productByTable[id-1].color_id)
    setWarehouseId(productByTable[id-1].warehouse_id)
    setStockAvailable(productByTable[id-1].stock_available)
    setStockOrdered(productByTable[id-1].stock_ordered)
    setEditDialog(id);
  };
  
  const toTransferStock = (id) => {
    // open dialog transfer
    setDialog({ id: id, open: true, type: 'Transfer' })

    // filter product, color, and fromWarehouse in transferStock
    const data = id ? productByTable.filter((item) => item.product_id === id) : null;
    // const uniqueColor = data ? data.map(item => item.color_id).filter((x, i, a) => a.indexOf(x) == i) : null
    // const filterColor = uniqueColor ? uniqueColor.map(item => productColor.filter(value => value.id === item)) : null
    // console.log('data: ', data)
    // console.log('uniqueColor: ', uniqueColor)
    // console.log('filterColor: ', filterColor)
    // console.log(filterColor.map((item, index) => item[index]))
    // setColor(filterColor)
    setName(id ? product[id-1].id : '')
    setFromWarehouse(data)
  }
  
  const renderTransfer = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', width: '40vw', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>Product Name</InputLabel>
            <Select
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              <MenuItem value={dialog.id ? product[dialog.id-1].id : null}>{dialog.id ? product[dialog.id-1].name : null}</MenuItem>
            </Select>
        </div>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>Color</InputLabel>
            <Select
              variant="outlined"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            >
              {productColor.map(item => {
                return (
                  <MenuItem key = {item.id} value={item.id}>{item.color}</MenuItem>
                )
              })}
            </Select>
        </div>
        <div>
          <InputLabel htmlFor="Name" shrink>Quantity</InputLabel>
            <TextField
              value={quantityTf}
              fullWidth
              onChange={(event) =>
                setQuantityTf(event.target.value)
              }
              variant="outlined"
              className={classes.inputStock}
            />
        </div>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>From Warehouse</InputLabel>
            <Select
              variant="outlined"
              value={fromWarehouse[0].warehouse_id}
              onChange={(event) => setFromWarehouse(event.target.value)}
            >
              {fromWarehouse.map(item => {
                return (
                  <MenuItem key = {item.warehouse_id} value={item.warehouse_id}>{item.warehouse_name}</MenuItem>
                )
              })}
            </Select>
        </div>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>To Warehouse</InputLabel>
            <Select
              variant="outlined"
              value={toWarehouse}
              onChange={(event) => setToWarehouse(event.target.value)}
            >
              {warehouse.map(item => {
                return (
                  <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                )
              })}
            </Select>
        </div>
        <Button
          variant="outlined"
          onClick = {() => dispatch(transferStock({product_id: name, color_id: color, from_warehouse: fromWarehouse, to_warehouse: toWarehouse, quantity: quantityTf}))}
        >
          Submit
        </Button>
      </div>
    )
  }

  return (
    <div>
      <FormControl style = {{display: 'flex', flexDirection: 'row'}}>
        <Button
          variant = "contained"
          disabled = {filterWarehouse !== 'All'}
          startIcon={<AddIcon/>}
          onClick = {() => {
            setDialog({id: null, open: true, type: 'Add'})
            setColor(1)
            dispatch(getProductByTable('only_product'))}}
        >
          Add Product Stock
        </Button>
      </FormControl>
      <Table>
        <TableHead>{tableHeadProductStock()}</TableHead>
        <TableBody>{tableBodyProductStock()}</TableBody>
      </Table>
      <Dialog
        open={dialog.open}
        maxWidth="xl"
        onClose={() => {
          setDialog({ id: null, open: false, type: '' })
          dispatch(getProductByTable('product_stock'))}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { dialog.type == 'Details' ? 'Details Product Stock' : dialog.type == 'Transfer' ? 'Transfer Stock' : 'Add Product Stock' }
        </DialogTitle>
        <DialogContent>
        { dialog.type == 'Details' ? renderDetails() : dialog.type == 'Transfer' ? renderTransfer() : renderAdd()}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ id: null, open: false, type: '' })
              dispatch(getProductByTable('product_stock'))}}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TableCategory = ({ categoryWarehouse, filterWarehouse, category, dispatch, loading }) => {
  const [editId, setEditId] = React.useState(null);
  const [add, setAdd] = React.useState({
    open: false
  })
  const [errors, setErrors] = React.useState(false)
  const [categoryName, setCategoryName] = React.useState('')
  const [parentCategory, setParentCategory] = React.useState(null)

  const renderAddCategory = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '40vw', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
          <InputLabel htmlFor="Name" shrink>Category</InputLabel>
          <TextField
            error = {errors ? true : false}
            id = "Name"
            fullWidth
            variant = "outlined"
            onChange={(event) => setCategoryName(event.target.value)}
            />
        </div>
        <div style={{margin: '0 2% 2% 0', width: "80%"}}>
            <InputLabel htmlFor="Length" shrink>Parent</InputLabel>
            <TextField
              error = {errors ? true : false}
              id ="Length"
              fullWidth
              variant = "outlined"
              onChange={(event) => setParentCategory(event.target.value)}
              />
        </div>
        <Typography style={{color: 'red', fontSize: 12, margin: '0 10px'}}>{errors ? errors : ''}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(addCategory({category: categoryName, parent_id: parentCategory}))
            setCategoryName('')
            setParentCategory(null)
            setAdd({open: false}) }}
        >
          Submit
        </Button>
      </div>
    )
  }

  const tableHeadCategory = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Parent</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  const tableBodyCategory = () => {
    return (categoryWarehouse.length !== 0 ? categoryWarehouse : category).map((item) => {
      return item.id === editId ? (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <TextField
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <TextField
              value={parentCategory}
              onChange={(event) => setParentCategory(event.target.value)}
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            <IconButton 
              onClick={() =>{
                dispatch(editCategory(item.id, {category: categoryName, parent_id: parentCategory}));
                setCategoryName('')
                setParentCategory(null)
                setEditId(null);
            }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => setEditId(null)}>
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.category}</TableCell>
          <TableCell>{item.parent}</TableCell>
          <TableCell>
            <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => setEditId(item.id)}>
              <EditIcon />
            </IconButton>
            <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => dispatch(deleteCategory(item.id))}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button
        variant = "contained"
        disabled = {filterWarehouse !== 'All'}
        startIcon={<AddIcon/>}
        onClick = {() => {setAdd({open: true})}}
      >
        Add Category
      </Button>
      <Dialog
        open={add.open}
        maxWidth="xl"
        onClose={() => {
          setAdd({ open: false })
          setErrors(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Category</DialogTitle>
        <DialogContent>{renderAddCategory()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAdd({ open: false })
              setErrors(false)
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>{tableHeadCategory()}</TableHead>
        <TableBody>{tableBodyCategory()}</TableBody>
      </Table>
    </>
  );
};

const TableProductCategory = ({ productByTable, category, productWarehouse, filterWarehouse, procat, dispatch, loading, errorAdd }) => {
  const [editId, setEditId] = React.useState(null);
  const [name, setName] = React.useState(1);
  const [categoryName, setCategoryName] = React.useState(1);
  const [add, setAdd] = React.useState({ open: false })
  const [errors, setErrors] = React.useState(false)

  const renderAddProductCategory = () => {
    return (
      <div style={{display: 'flex', width: '40vw', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '25%', marginRight: '2%'}}>
          <InputLabel shrink>Name</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            >
            {productByTable.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                )
              })}
          </Select>
        </div>
        <div style={{width: '25%', marginRight: '2%'}}>
          <InputLabel shrink>Category</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            >
            {category.map(item => {
              return (
                <MenuItem key = {item.id} value={item.id}>{item.category}</MenuItem>
                )
              })}
          </Select>
        </div>
        <Typography style={{color: 'red', fontSize: 12, margin: '0 10px'}}>{errors ? errors : ''}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(addProductCategory({product_id: name, category_id: categoryName}))
            if(!errorAdd) setAdd({open: false}) }}
        >
          Submit
        </Button>
      </div>
    )
  }

  const tableHeadProductCategory = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  const tableBodyProductCategory = () => {
    return (productWarehouse.length !== 0 ? productWarehouse.product : procat).map((item) => {
      return item.id === editId ? (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <Select
              fullWidth
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              >
              {productByTable.map(item => {
                return (
                  <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
                  )
                })}
            </Select>
          </TableCell>
          <TableCell>
            <Select
              fullWidth
              variant="outlined"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              >
              {category.map(item => {
                return (
                  <MenuItem key = {item.id} value={item.id}>{item.category}</MenuItem>
                  )
                })}
            </Select>
          </TableCell>
          <TableCell>
            <IconButton 
              onClick={() => {
                dispatch(editProductCategory(item.product_id, { category_id: categoryName }));
                setEditId(null) }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => setEditId(null)}>
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.category}</TableCell>
          <TableCell>
            <IconButton 
              disabled = {filterWarehouse !== 'All'} 
              onClick={() => {
                    setEditId(item.id)
                    setName(item.product_id)
                    setCategoryName(item.category_id)}}
              >
              <EditIcon />
            </IconButton>
            <IconButton disabled = {filterWarehouse !== 'All'} onClick={() => dispatch(deleteProductCategory(item.product_id))}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button
        variant = "contained"
        disabled = {filterWarehouse !== 'All'}
        startIcon={<AddIcon/>}
        onClick = {() => setAdd({open: true})}
      >
        Add Product Category
      </Button>
      <Dialog
        open={add.open}
        maxWidth="xl"
        onClose={() => {
          setAdd({ open: false })
          setErrors(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Product Category</DialogTitle>
        <DialogContent>{renderAddProductCategory()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAdd({ open: false })
              setErrors(false)
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>{tableHeadProductCategory()}</TableHead>
        <TableBody>{tableBodyProductCategory()}</TableBody>
      </Table>
    </>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: "15vh",
  },
  inputStock: {
    width: '20%'
  }
}));

export default function ProductAdmin() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [filterWarehouse, setFilterWarehouse] = React.useState("All");

  const handleChange = (event, newValue) => {
    if (newValue == 0) {
      dispatch(getProduct('only_product'));
    } else if (newValue == 1) {
      dispatch(getProduct('product_img_group'));
      dispatch(getProductByTable("product_image"));
    } else if (newValue == 2) {
      dispatch(getProduct('product_details'));
      dispatch(getProductByTable("product_stock"));
    } else if (newValue == 4) {
      dispatch(getProductByTable("only_product"));
    }
    setValue(newValue);
  };

  const { product, productByTable, productColor, productWarehouse, warehouse, category, categoryWarehouse, loading, errorAdd, procat, role, id } = useSelector(
    (state) => {
      return {
        product: state.productReducer.product,
        productByTable: state.productReducer.productByTable,
        productColor: state.productReducer.productColor,
        warehouse: state.warehouseReducer.warehouse,
        category: state.categoryReducer.category,
        categoryWarehouse: state.categoryReducer.categoryWarehouse,
        loading: state.productReducer.loading,
        errorAdd: state.productReducer.errorAdd,
        productWarehouse: state.productReducer.productWarehouse,
        procat: state.productCategoryReducer.procat,
        role: state.userReducer.role,
        id: state.userReducer.id
      };
    }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProduct('only_product'));
    dispatch(getProductColor());
    dispatch(getWarehouse());
    dispatch(getCategory())
    dispatch(getProductCategory())
    console.log(`role: ${role}, id: ${id}`)
    if(role === 2){
      dispatch(getProductWarehouse(id-1, id-1))
      dispatch(getCategoryByWarehouse(id-1, id-1))
      setFilterWarehouse(id-1)
    }
  }, []);

  return (
    <div className={classes.root}>
      <Typography>Product Admin Page</Typography>
      <div style={{display: 'flex'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Products" />
          <Tab label="Product Image" />
          <Tab label="Product Stock" />
          <Tab label="Category" />
          <Tab label="Product Category" />
        </Tabs>
        <Select
          variant="outlined"
          disabled = {role === 2 ? true : false}
          value={filterWarehouse}
          onChange={(event) => {
            dispatch(getProductWarehouse(event.target.value, event.target.value))
            dispatch(getCategoryByWarehouse(event.target.value, event.target.value))
            setFilterWarehouse(event.target.value)
          }}
        >
          <MenuItem value="All">All Warehouse</MenuItem>
          {warehouse.map(item => {
            return (
              <MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>
            )
          })}
        </Select>
      </div>
      <TabPanel value={value} index={0}>
        <TableProducts product={product} productWarehouse={productWarehouse} filterWarehouse={filterWarehouse} loading={loading} errorAdd={errorAdd} dispatch={dispatch}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableProductImage product={product} productByTable={productByTable} productWarehouse={productWarehouse} filterWarehouse={filterWarehouse} dispatch={dispatch}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableProductStock product={product} productByTable={productByTable} filterWarehouse={filterWarehouse} warehouse={warehouse} productColor={productColor} dispatch={dispatch} classes={classes} productWarehouse={productWarehouse}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TableCategory category={category} filterWarehouse={filterWarehouse} categoryWarehouse={categoryWarehouse} loading={loading} dispatch={dispatch}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TableProductCategory category={category} procat={procat} productByTable={productByTable} productWarehouse={productWarehouse} filterWarehouse={filterWarehouse} dispatch={dispatch} loading={loading} errorAdd={errorAdd}/>
      </TabPanel>
    </div>
  );
}
