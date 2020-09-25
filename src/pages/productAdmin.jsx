import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
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
  getProductAdmin,
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
  transferStock
} from "../action";

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

const TableProducts = ({ productAdmin }) => {
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

  const { loading } = useSelector((state) => {
    return {
      loading: state.productReducer.loading,
    };
  });

  const dispatch = useDispatch();

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
    return productAdmin.map((item) => {
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
            <IconButton onClick={() => handleDone(item.id)}>
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => handleCancel()}>
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
              <IconButton onClick={() => handleEdit(item.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
    });
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    console.log(`Delete product_id: ${id}`);
    dispatch(deleteProduct(id))
  };

  const handleDone = (id) => {
    let body = {
      name,
      price,
      desc,
      height,
      width,
      length,
      weight,
      material,
    };

    dispatch(editProduct(id, body));
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setAdd({ open: true })}
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
        <DialogTitle id="alert-dialog-title">Add Product Image</DialogTitle>
        <DialogContent>Form Control Product Image</DialogContent>
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

const TableProductImage = ({ product, productAdmin }) => {
  const [edit, setEdit] = React.useState({
    id: null,
    open: false,
  });
  const [editDialog, setEditDialog] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [add, setAdd] = React.useState({
    open: false,
  });

  const dispatch = useDispatch();

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
    return product.map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <img src={item.image[0]} width="100px" alt="product-image" />
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ErrorIcon />}
              onClick={() => setEdit({ id: item.id, open: true })}
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const tableDialog = () => {
    const data = productAdmin.filter((item) => item.product_id === edit.id);
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
          {edit.id !== null
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
                    <IconButton onClick={() => handleDone(item.id)}>
                      <DoneIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel()}>
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
                      <IconButton onClick={() => handleEdit(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)}>
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
    setEditDialog(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductImage(id))
  };

  const handleDone = (id) => {
    let body = {
      id,
      image,
    };

    console.log("product_id: ", edit.id);
    console.log(body);

    dispatch(editProductImage(edit.id, body));
    setEditDialog(null);
  };

  const handleCancel = () => {
    setEditDialog(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setAdd({ open: true })}
      >
        Add Product Image
      </Button>
      <Table>
        <TableHead>{tableHeadProductImage()}</TableHead>
        <TableBody>{tableBodyProductImage()}</TableBody>
      </Table>
      <Dialog
        open={add.open}
        maxWidth="xl"
        onClose={() => setAdd({ open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Product Image</DialogTitle>
        <DialogContent>Form Control Product Image</DialogContent>
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
      <Dialog
        open={edit.open}
        maxWidth="xl"
        onClose={() => setEdit({ id: null, open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Image</DialogTitle>
        <DialogContent>{tableDialog()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEdit({ id: null, open: false })}
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

const TableProductStock = ({ productAdmin, productColor, warehouse, classes }) => {
  const [edit, setEdit] = React.useState({
    id: null,
    open: false,
  });
  const [editDialog, setEditDialog] = React.useState(null);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(0);
  const [warehouseId, setWarehouseId] = React.useState(0);
  const [stockAvailable, setStockAvailable] = React.useState(0);
  const [stockOrdered, setStockOrdered] = React.useState(0);
  const [tfStock, setTfStock] = React.useState({
    id: null,
    open: false,
  });
  const [nameTf, setNameTf] = React.useState(1)
  const [colorTf, setColorTf] = React.useState(1)
  const [fromWarehouse, setFromWarehouse] = React.useState(1)
  const [toWarehouse, setToWarehouse] = React.useState(1)
  const [quantityTf, setQuantityTf] = React.useState(1)
  const [filterWarehouse, setFilterWarehouse] = React.useState('All')
  const [add, setAdd] = React.useState({
    open: false
  })

  const { productWarehouse, product } = useSelector(
    (state) => {
      return {
        product: state.productReducer.product,
        productWarehouse: state.productReducer.productWarehouse,
      };
    }
  );
  const dispatch = useDispatch();

  const tableHeadProductStock = () => {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Total Stock Available</TableCell>
        <TableCell>Total Stock Ordered</TableCell>
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
          <TableCell>
            {productWarehouse.length !== 0 ? item.stock_available : item.stock_available.reduce((a, b) => parseInt(a) + parseInt(b))}
          </TableCell>
          <TableCell>
            {productWarehouse.length !== 0 ? item.stock_ordered : item.stock_ordered.reduce((a, b) => parseInt(a) + parseInt(b))}
          </TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="primary"
              disabled={filterWarehouse !== 'All'}
              startIcon={<ErrorIcon />}
              onClick={() => setEdit({ id: item.id, open: true })}
            >
              Details
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={filterWarehouse !== 'All'}
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

  const tableDialog = () => {
    const data = edit.id ? productAdmin.filter((item) => item.product_id === edit.id) : null;
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
          {edit.id !== null
            ? data.map((item, index) => {
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
                          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
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
                          <MenuItem key={item.id} value={item.id}>{item.color}</MenuItem>
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
                          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        )
                      })}
                    </Select>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      disabled={stockAvailable === 1}
                      onClick={() => setStockAvailable((prev) => parseInt(prev - 1))}
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
                      onClick={() => setStockAvailable((prev) => parseInt(prev + 1))}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      disabled={stockOrdered <= 1}
                      onClick={() => setStockOrdered((prev) => parseInt(prev - 1))}
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
                      onClick={() => setStockOrdered((prev) => parseInt(prev + 1))}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton onClick={() => handleDone(item.id)}>
                      <DoneIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel()}>
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
                      <IconButton onClick={() => handleEdit(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)}>
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

  const toTransferStock = (id) => {
    setTfStock({ id: id, open: true })
    const data = id ? productAdmin.filter((item) => item.product_id === id) : null;
    const uniqueColor = data ? data.map(item => item.color_id).filter((x, i, a) => a.indexOf(x) == i) : null
    console.log('data: ', data)
    console.log('uniqueColor: ', uniqueColor)
    setNameTf(id ? product[id - 1].id : '')
    // setColorTf((uniqueColor ? uniqueColor : []).map(item => productColor[item]))

  }
  const handleEdit = (id) => {
    setName(productAdmin[id - 1].product_id)
    setColor(productAdmin[id - 1].color_id)
    setWarehouseId(productAdmin[id - 1].warehouse_id)
    setStockAvailable(productAdmin[id - 1].stock_available)
    setStockOrdered(productAdmin[id - 1].stock_ordered)
    setEditDialog(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductStock(id))
  };

  const handleDone = (id) => {
    let body = {
      product_id: name, color_id: color, warehouse_id: warehouseId, stock_available: stockAvailable, stock_ordered: stockOrdered
    }

    dispatch(editProductStock(id, body))
    setEditDialog(null);
  };

  const handleCancel = () => {
    setEditDialog(null);
  };

  const renderTransfer = () => {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Select
                  variant="outlined"
                  value={nameTf}
                  onChange={(event) => setNameTf(event.target.value)}
                >
                  <MenuItem value={tfStock.id ? product[tfStock.id - 1].id : null}>{tfStock.id ? product[tfStock.id - 1].name : null}</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={colorTf}
                  onChange={(event) => setColorTf(event.target.value)}
                >
                  {productColor.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.color}</MenuItem>
                    )
                  })}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  value={quantityTf}
                  onChange={(event) =>
                    setQuantityTf(event.target.value)
                  }
                  variant="outlined"
                  className={classes.inputStock}
                />
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={fromWarehouse}
                  onChange={(event) => setFromWarehouse(event.target.value)}
                >
                  {warehouse.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )
                  })}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={toWarehouse}
                  onChange={(event) => setToWarehouse(event.target.value)}
                >
                  {warehouse.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )
                  })}
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="outlined"
          onClick={() => handleTransfer()}
        >
          Submit
        </Button>
      </div>
    )
  }

  const handleTransfer = () => {
    let body = {
      product_id: nameTf, color_id: colorTf, from_warehouse: fromWarehouse, to_warehouse: toWarehouse, quantity: quantityTf
    }
    dispatch(transferStock(body))
  }

  return (
    <div>
      <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
        <Select
          variant="outlined"
          value={filterWarehouse}
          onChange={(event) => {
            if (event.target.value !== 'All') {
              dispatch(getProductWarehouse(event.target.value, event.target.value))
              setFilterWarehouse(event.target.value)
            } else {
              dispatch(getProductWarehouse(event.target.value, event.target.value))
              setFilterWarehouse(event.target.value)
            }
          }}
        >
          <MenuItem value="All">All Warehouse</MenuItem>
          {warehouse.map(item => {
            return (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            )
          })}
        </Select>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAdd({ open: true })}
        >
          Add Products
        </Button>
      </FormControl>
      <Table>
        <TableHead>{tableHeadProductStock()}</TableHead>
        <TableBody>{tableBodyProductStock()}</TableBody>
      </Table>
      <Dialog
        open={edit.open}
        maxWidth="xl"
        onClose={() => setEdit({ id: null, open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Stock</DialogTitle>
        <DialogContent>{tableDialog()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEdit({ id: null, open: false })}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={tfStock.open}
        maxWidth="xl"
        onClose={() => setTfStock({ id: null, open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Transfer Stock</DialogTitle>
        <DialogContent>{renderTransfer()}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTfStock({ id: null, open: false })}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={add.open}
        maxWidth="xl"
        onClose={() => setAdd({ open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Product Stock</DialogTitle>
        <DialogContent>Form Control Product Stock</DialogContent>
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
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: "15vh",
  },
  inputStock: {
    width: '20%'
  },
}));

export default function ProductAdmin() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (newValue == 0) {
      dispatch(getProductAdmin("products"));
    } else if (newValue == 1) {
      dispatch(getProductAdmin("product_image"));
    } else if (newValue == 2) {
      dispatch(getProductAdmin("product_stock"));
    }
    setValue(newValue);
  };

  const { product, productAdmin, productColor, warehouse } = useSelector(
    (state) => {
      return {
        product: state.productReducer.product,
        productAdmin: state.productReducer.productAdmin,
        productColor: state.productReducer.productColor,
        warehouse: state.warehouseReducer.warehouse
      };
    }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductAdmin("products"));
    dispatch(getProduct());
    dispatch(getProductColor());
    dispatch(getWarehouse());
  }, []);

  return (
    <div className={classes.root}>
      <Typography>Product Admin Page</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Products" />
        <Tab label="Product Image" />
        <Tab label="Product Stock" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableProducts productAdmin={productAdmin} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableProductImage product={product} productAdmin={productAdmin} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableProductStock
          product={product}
          productAdmin={productAdmin}
          warehouse={warehouse}
          productColor={productColor}
          classes={classes}
        />
      </TabPanel>
    </div>
  );
}
