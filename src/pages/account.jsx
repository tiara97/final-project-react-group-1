import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List, Tab, Tabs, makeStyles, Box,
    Button, Typography, IconButton,
    TextField, FormControl, FormLabel,
    FormControlLabel, Radio, RadioGroup,
    Table, TableHead, TableBody, TableCell,
    TableRow, TableContainer, Backdrop,
    CircularProgress, Chip
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListIcon from '@material-ui/icons/List';
import { useSelector, useDispatch } from "react-redux"
import { Link, Redirect } from 'react-router-dom'
import { getProfile, getFavoriteByID, editProfile, uploadPic, getAddress, editAddress, deleteAddress, addAddress, addMainAddress, deleteFavorite, getUserOrder, confirmDone, getUserOrderByStatus, addRating } from '../action'
import { URL_IMG } from '../action/helper'
import avatar from '../assets/avatar.jpg'
import DialogComp from '../component/dialog';

// Kontainer Tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}
// Kontainer Card

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        // display: 'flex',
        // flexDirection: 'column',
        height: "auto",
        paddingTop: '10vh',
        marginLeft: '10vw',
        marginRight: '10vw',
        minHeight: "90vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    title: {
        display: 'flex',
        padding: 10,
        marginBottom: 10
    },
    box: {
        backgroundColor: '#f7f7f7',
        height: 'auto',
        marginLeft: 300,
        marginRight: 300,
    },
    // favorite style
    boxFavorite: {
        // backgroundColor: 'pink',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    boxFav: {
        // backgroundColor: 'pink',
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        // gridTemplateRows: '20% 80%',
        padding: 30,
        marginLeft: 100,
        marginRight: 100
    },
    favTitle: {
        gridColumn: '1 / span 3',
        // backgroundColor: 'lavender',
        padding: 10
    },
    favImg: {
        // height: '200',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        // padding: 10
    },
    favInfo: {
        // backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingLeft: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    favBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-end',
        marginRight: 10
    },
    boxProfile: {
        // backgroundColor: '#f7f7f7',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 100,
        marginRight: 100
    },
    // history style
    boxOrder: {
        // backgroundColor: 'pink',
        height: 'auto',
        display: 'grid',
        marginLeft: 100,
        marginRight: 100
        // gridTemplateColumns: '100%',
        // gridTemplateRows: '10% 10% 80%',
        // padding: 25
    },
    boxAddress: {
        // backgroundColor: 'pink',
        height: 'auto',
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 100,
        marginRight: 100
    },
    orderChip: {
        marginLeft: 10
    },
    orderTitle: {
        // gridColumn: '1 / span 3',
        // backgroundColor: 'lavender',
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between'
    },
    orderDet: {
        // height: 200,
        // gridColumn: '1 / span 3',
        // backgroundColor: '#f2f2f2',
        padding: 10
    },
    orderImg: {
        height: 150,
        width: 150,
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: '#f2f2f2',
    },
    orderInfo: {
        // backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingLeft: 30,
        flexGrow: 1
    },
    orderBtn: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    divTab: {
        flexGrow: 1,
        // width: '80vw',
        backgroundColor: theme.palette.background.paper
    },
    input: {
        display: 'none',
    },
    avatar: {
        height: '200px',
        width: '200px',
        marginBottom: '20px'
    },
    divAvatar: {
        width: '200px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#f7f7f7',
        padding: '10px',
    },
    divInfo: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'lavender',
        padding: '10px 40px',
        justifyContent: 'space-between'
    },
    divInfoButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 0,
        marginTop: 5
    },
}));


const Account = ({ location }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const { id, profile, favorite, error, order, username, email, status, addressUser } = useSelector((state) => {
        return {
            id: state.userReducer.id,
            profile: state.profileReducer.profile,
            favorite: state.favoriteReducer.favorite,
            error: state.profileReducer.error,
            order: state.orderReducer.order,
            username: state.userReducer.username,
            email: state.userReducer.email,
            status: state.userReducer.status,
            addressUser: state.addressReducer.address
        }
    })
    const dispatch = useDispatch()
    
    React.useEffect(() => {
        console.log(loading)
        dispatch(getFavoriteByID())
        dispatch(getAddress())
        dispatch(getUserOrder())
        dispatch(getProfile())
        setLoading(false)
    }, [])

    // fungsi untuk ganti tab
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // fungsi untuk upload picture
    const handleUpload = (props) => {
        let fileProps = props.target.files[0]
        console.log(fileProps)
        let data = new FormData()
        data.append('IMG', fileProps)
        console.log(data)
        dispatch(uploadPic(data))
    };

    const TabProfile = (props) => {
        // state edit profile
        const [edit, setEdit] = React.useState(false);
        const [user_fullname, setFullname] = React.useState(profile.user_fullname ? profile.user_fullname : '');
        const [phone, setPhone] = React.useState(profile.phone ? profile.phone : '');
        const [gender, setGender] = React.useState('');

        const handleChange = (event) => {
            setGender(event.target.value);
        };
        const handleSave = () => {
            const body = { user_fullname, phone, gender }
            console.log(body)
            dispatch(editProfile(body))
            setEdit(false)
        }

        return (
            <Box p={3} className={classes.boxProfile}>
                <div className={classes.divAvatar}>
                    <div className={classes.avatar}>
                        <img src={profile.image ? URL_IMG + profile.image : avatar} width="100%" alt="profile-img" style={{ borderRadius: '50%' }}></img>
                    </div>
                    <Typography>{error ? error : ''}</Typography>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUpload}
                    />
                    <label htmlFor="contained-button-file">
                        <Button className={classes.button} variant="contained" color="primary" component="span"
                            startIcon={<PhotoCamera />}>
                            Upload
                                </Button>
                    </label>
                    {/* <Button className={classes.button} variant="contained" color="primary" style={{ marginTop: 10 }}>Edit Password</Button> */}
                </div>
                <div className={classes.divInfo}>
                    <Typography variant='h5'>{username}</Typography>
                    <Typography variant="subtitle1">{email}</Typography>
                    <TextField id="outlined-basic"
                        label="Nama" variant='outlined' onChange={(event) => setFullname(event.target.value)} defaultValue={profile.user_fullname} disabled={edit ? false : true} />
                    <TextField id="outlined-basic"
                        label="Nomor Handphone" onChange={(event) => setPhone(event.target.value)} variant='outlined' inputMode='numeric' defaultValue={profile.phone} disabled={edit ? false : true} />
                    {edit ? (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={gender} defaultValue={gender} onChange={handleChange}>
                                <FormControlLabel value="male" control={<Radio />} label="Laki-laki" />
                                <FormControlLabel value="female" control={<Radio />} label="Perempuan" />
                            </RadioGroup>
                        </FormControl>
                    )
                        :
                        <TextField id="outlined-basic"
                            label="Gender" variant='outlined' value={profile.gender} disabled />
                    }
                    <Typography></Typography>
                    {edit ? (
                        <div className={classes.divInfoButton}>
                            <Button className={classes.button} style={{ marginRight: 10 }} variant='contained' color='primary' onClick={handleSave}>Save</Button>
                            <Button className={classes.button} variant='contained' color='secondary' onClick={() => setEdit(false)}>Cancel</Button>
                        </div>
                    ) : (
                            <div className={classes.divInfoButton}>
                                <Button className={classes.button} variant='contained' color='primary' onClick={() => setEdit(true)}>Edit Profil</Button>
                            </div>
                        )}
                </div>
            </Box>
        )
    }
    const TabAddress = (props) => {
        const [edit, setEdit] = React.useState('');
        const [index, setIndex] = React.useState('');
        const [id_address, setRadio] = React.useState(profile.main_address_id);
        // insert state
        const [addressNew, setAddressNew] = React.useState('');
        const [cityNew, setCityNew] = React.useState('');
        const [provinceNew, setProvinceNew] = React.useState('');
        const [postcodeNew, setPostcodeNew] = React.useState('');
        const [latitude, setLat] = React.useState(null);
        const [longitude, setLong] = React.useState(null);
        // edit state
        const [address, setAddress] = React.useState('');
        const [city, setCity] = React.useState('');
        const [province, setProvince] = React.useState('');
        const [postcode, setPostcode] = React.useState('');

        const handleChange = (event) => {
            console.log(event.target.value)
            setRadio(event.target.value);
            const body = { id_address: event.target.value }
            console.log(body)
            dispatch(addMainAddress(body))
        };
        const handleLoc = () => {
            const successCB = (position) => {
                console.log(position)
                let lat = position.coords.latitude
                let long = position.coords.longitude
                handleAdd(lat, long)
            }
            const errorCB = (error) => {
                console.log(error)
            }
            navigator.geolocation.getCurrentPosition(successCB, errorCB)
        }
        const handleAdd = (lat, long) => {
            let address = addressNew
            let city = cityNew
            let province = provinceNew
            let postcode = postcodeNew
            const body = { address, city, province, postcode, latitude: lat, longitude: long }
            console.log(body)
            dispatch(addAddress(body))
            // setAddressNew('')
            // setCityNew('')
            // setProvinceNew('')
            // setPostcodeNew('')
        };
        const handleDone = () => {
            const body = { address, city, province, postcode }
            console.log(body)
            dispatch(editAddress(body, index))
            setEdit(false)
        };
        const handleEdit = (index, id_address) => {
            console.log(index)
            console.log(id_address)
            setEdit(index)
            setIndex(id_address)
            setAddress(addressUser[index].address)
            setCity(addressUser[index].city)
            setProvince(addressUser[index].province)
            setPostcode(addressUser[index].postcode)
        }

        return (
            <Box p={2} className={classes.boxAddress}>
                <TableContainer component='div'>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Alamat utama</TableCell>
                                <TableCell>Alamat</TableCell>
                                <TableCell align="center">Kota</TableCell>
                                <TableCell align="center">Provinsi</TableCell>
                                <TableCell align="center">Kodepos</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addressUser.map((item, index) =>
                                edit === index ? (
                                    <TableRow key={index}>
                                        <TableCell align='center'>
                                            <Radio
                                                checked={id_address == item.id ? true : false}
                                                onChange={handleChange}
                                                value={item.id}
                                                name="radio-button"
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Alamat" variant='outlined' onChange={(event) => setAddress(event.target.value)} value={address} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Kota" variant='outlined' onChange={(event) => setCity(event.target.value)} value={city} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Provinsi" variant='outlined' onChange={(event) => setProvince(event.target.value)} value={province} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Kodepos" variant='outlined' onChange={(event) => setPostcode(event.target.value)} value={postcode} size='small' />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="done" color='primary' onClick={handleDone}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton aria-label="clear" color='secondary' onClick={() => setEdit('')}>
                                                <ClearIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                        <TableRow key={index}>
                                            <TableCell align='center'>
                                                <Radio
                                                    checked={id_address == item.id ? true : false}
                                                    onChange={handleChange}
                                                    value={item.id}
                                                    name="radio-button"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.address}
                                            </TableCell>
                                            <TableCell align="left">{item.city}</TableCell>
                                            <TableCell align="left">{item.province}</TableCell>
                                            <TableCell align="left">{item.postcode}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="edit" color='primary' onClick={() => handleEdit(index, item.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" color='secondary' onClick={() => dispatch(deleteAddress(item.id))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                            <TableRow>
                                <TableCell align='center'>
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Alamat" variant='outlined' onChange={(event) => setAddressNew(event.target.value)} value={addressNew} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Kota" variant='outlined' onChange={(event) => setCityNew(event.target.value)} value={cityNew} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Provinsi" variant='outlined' value={provinceNew} onChange={(event) => setProvinceNew(event.target.value)} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Kodepos" variant='outlined' value={postcodeNew} onChange={(event) => setPostcodeNew(event.target.value)} size='small' required />
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="done" color='primary' onClick={handleLoc} >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )

    }
    const TabFavorite = (props) => {
        const handleCart = (id) => {
            console.log(id)
        }
        if (favorite.length === 0) {
            return (
                <Box p={3} className={classes.boxFavorite}>
                    <Typography variant='h5' style={{ textAlign: 'center', marginBottom: 10 }}>Oops! Produk favoritmu kosong. Yuk Belanja!</Typography>
                    <Link to='/Produk'>
                        <Button className={classes.button} onClick={() => console.log('test')} variant='contained'>Lihat Produk</Button>
                    </Link>
                </Box>
            )
        }
        return favorite.map((item, index) => {
            return (
                <Box p={3} className={classes.boxFav} key={index}>
                    <div className={classes.favTitle}>
                        <Typography variant='h5'>{item.name}</Typography>
                    </div>
                    <div className={classes.favImg}>
                        <img src={item.image} height="100%" width='100%' alt={item.name}></img>
                    </div>
                    <div className={classes.favInfo}>
                        <Typography variant='h5' style={{ marginBottom: 10 }}>Rp. {item.price_each}</Typography>
                        <Typography variant='body1' style={{ marginBottom: 10 }}>Color : {item.color}</Typography>
                        <Typography variant='body1' style={{ marginBottom: 10 }}>{item.desc}</Typography>
                        <div className={classes.favBtn}>
                            <Link to={{ pathname: '/Produk-Detail', search: `id=${item.product_id}`, state: { id: `${item.product_id}` } }}>
                                <Button className={classes.button} variant="contained" color="primary" component="span" style={{ marginRight: 10 }} onClick={() => handleCart(item.id)}
                                    startIcon={<AddShoppingCartIcon />}>
                                    Add to Cart
                                </Button>
                            </Link>
                            <Button className={classes.button} variant="contained" color="secondary" component="span"
                                startIcon={<DeleteIcon />} onClick={() => dispatch(deleteFavorite(item.id))}>
                                Hapus Favorit
                            </Button>
                        </div>
                    </div>
                </Box>
            )
        })
    }
    const TabHistory = (props) => {
        const [toReceipt, setToReceipt] = React.useState(false)
        const [orderNum, setOrderNum] = React.useState(null)
        const [chipID, setChipID] = React.useState(0)
        const [rate, setRate] = React.useState(0)
        const [comment, setComment] = React.useState('')
        const [dialog, setDialog] = React.useState({
            open: false,
            order_number: null,
            product_id: null,
            color_id: null,
        })
        const chips = [
            "Semua",
            "Waiting for payment",
            "Payment success",
            "On delivery",
            "Done",
            "Cancelled"
        ];

        // komponen
        const DivImg = (props) => {
            const { ind, img, name } = props
            return (
                <div className={classes.orderImg} key={ind}>
                    <img src={img} width='100%' alt={name}></img>
                </div>
            )
        }
        const DivInfo = (props) => {
            const { ind, name, price, color, qty } = props
            return (
                <div className={classes.orderInfo} key={ind}>
                    <Typography variant='h6' style={{ marginBottom: 10 }}>{name}</Typography>
                    <Typography style={{ marginBottom: 10 }} variant='subtitle2'>Varian : {color}</Typography>
                    <Typography variant='h6' style={{ marginBottom: 10 }}>Rp. {price}</Typography>
                    <Typography style={{ marginBottom: 10 }} variant='subtitle2'>Jumlah : {qty}</Typography>
                </div>
            )
        }
        const DivRating = (props) => {
            const { title, ind, value } = props
            return (
                <div className={classes.orderInfo} key={ind}>
                    <Typography variant='h6' style={{ marginBottom: 10 }}>{title}</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        readOnly
                    />
                </div>
            )
        }
        const DivButton = (props) => {
            const { onClick, children, icon } = props
            return (
                <div>
                    <Button variant="contained" color="primary" component="span"
                        startIcon={icon} onClick={onClick}>
                        {children}
                    </Button>
                </div>
            )
        }
        const ChipStatus = (props) => {
            const { label, onClick, color } = props
            return (
                <Chip className={classes.orderChip} label={label} onClick={onClick} color={color} />
            )
        }
        // fungsi
        const handleRate = () => {
            console.log(id)
            let order_number = parseInt(dialog.order_number)
            let product_id = parseInt(dialog.product_id)
            let color_id = parseInt(dialog.color_id)
            const body = { order_number, user_id: id, product_id, color_id, rate, comment }
            console.log(body)
            dispatch(addRating(body))
            setDialog({ open: false, order_number: null, product_id: null, color_id: null })
        }
        const handleDoneConf = (order_number, product, color) => {
            let product_id = product
            let color_id = color
            const body = { order_number: order_number, user_id: id, product_id, color_id }
            console.log(body)
            dispatch(confirmDone(order_number, body))
        }
        // chipID nya balik ke 0 sendiri gatau knp
        const handleChip = (id) => {
            console.log(id)
            let status_id = parseInt(id)
            setChipID(id - 1)
            if (id === 1) {
                return dispatch(getUserOrder())
            }
            const body = { order_status_id: status_id }
            console.log(body)
            dispatch(getUserOrderByStatus(body))
        }

        const handletoReceipt = (order) => {
            setToReceipt(true)
            setOrderNum(order)
        }

        if (orderNum && toReceipt) {
            return <Redirect to={{ pathname: `/Receipt`, search: `${orderNum}` }} />
        }
        if (order.length === 0) {
            return (
                <Box p={3} className={classes.boxFavorite}>
                    <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
                        {chips.map((item, index) => {
                            return (
                                <li key={index} style={{ listStyle: 'none' }}>
                                    <ChipStatus label={item} onClick={() => handleChip(index + 1)} color={index == chipID ? 'primary' : ''} />
                                </li>
                            )
                        })}
                    </div>
                    <Typography variant='h5' style={{ textAlign: 'center', marginBottom: 10 }}>Oops! Riwayat belanjamu kosong. Yuk Belanja!</Typography>
                    <Link to='/Produk'>
                        <Button onClick={() => console.log('test')} variant='contained'>Lihat Produk</Button>
                    </Link>
                </Box>
            )
        }
        return (
            <Box p={3} className={classes.boxOrder}>
                <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
                    {chips.map((item, index) => {
                        return (
                            <li key={index} style={{ listStyle: 'none' }}>
                                {index == chipID ? (
                                    <ChipStatus label={item} onClick={() => handleChip(index + 1)} />
                                ) : (
                                        <ChipStatus label={item} onClick={() => handleChip(index + 1)} />
                                    )}
                            </li>
                        )
                    })}
                </div>
                {order.length !== 0 ? (order.map((item, index) => {
                    return (
                        <>
                            <div className={classes.orderTitle}>
                                <Typography variant='subtitle2'>{item.order_date ? item.order_date.slice(0, 10) : ''}</Typography>
                            </div>
                            <div className={classes.orderTitle}>
                                <Typography variant='h6'>{item.order_number ? item.order_number : ''}</Typography>
                                <Typography variant='h6'>Status : {item.status ? item.status : ''}</Typography>
                                <Typography variant='h6'>Rp. {item.total.toLocaleString() ? item.total.toLocaleString() : ''}</Typography>
                            </div>
                            <div className={classes.orderDet}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Produk</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {item.image.map((value, ind) => {
                                                return (
                                                    <div style={{ display: 'flex', marginBottom: 10 }}>
                                                        <DivImg ind={ind} img={value} name={value} />
                                                        <DivInfo ind={ind} price={item.price_each[ind]} color={item.color[ind]} qty={item.qty[ind]} name={item.name[ind]} />
                                                        {item.status === 'Done' ? (
                                                            item.rating ? (item.rating[ind] !== '0' ?
                                                            <DivRating title='Rating' ind={ind} value={item.rating[ind]} />
                                                            :
                                                            <DivButton children='Beri ulasan'
                                                                onClick={() => setDialog({ open: true, order_number: item.order_number, product_id: item.product_id[ind], color_id: item.color_id[ind] })} />)
                                                            :
                                                            null
                                                        ) : null}
                                                    </div>
                                                )
                                            })}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {item.status === 'Waiting for payment' ? (
                                    <Link to={{ pathname: `/Konfirmasi`, search: `${item.order_number}` }}>
                                        <Button className={classes.button} variant="contained">
                                            <PhotoCamera /> Upload Bukti
                                    </Button>
                                    </Link>
                                ) : null}
                                {item.status === "On delivery" ? (
                                    <Button className={classes.button} variant="contained" onClick={() => handleDoneConf(item.order_number, item.product_id, item.color_id)}>
                                        Terima Barang
                                    </Button>
                                ) : null}
                                {item.status === 'Done' ? (
                                    <Link to="/Produk">
                                        <Button className={classes.button} variant="contained">
                                            <AddShoppingCartIcon /> Beli Lagi
                                    </Button>
                                    </Link>
                                ) : null}
                                {item.status === 'On progress' ? (
                                    <Link to="/Cart">
                                        <Button className={classes.button} variant="contained">
                                            <ShoppingCartIcon /> Lihat Keranjang
                                    </Button>
                                    </Link>
                                ) : null}
                                {item.status === "Payment success" || item.status === "On delivery" || item.status === "Done" ?
                                    (<Button
                                        style={{ marginLeft: 5 }}
                                        className={classes.button}
                                        variant="contained"
                                        onClick={() => handletoReceipt(item.order_number)}>
                                        <ListIcon /> Lihat Receipt
                                    </Button>) : null}

                            </div>
                        </>
                    )
                })) : null}
                <DialogComp open={dialog.open} onClose={() => setDialog({ open: false, order_number: null, product_id: null, color_id: null })}
                    text={<div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography style={{ marginBottom: 10 }}>Beri ulasanmu!</Typography>
                        <Rating
                            style={{ marginBottom: 10 }}
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                                setRate(newValue);
                            }}
                        />
                        <TextField style={{ marginBottom: 10 }} id="outlined-basic" label="Comment" variant="outlined" onChange={(event) => setComment(event.target.value)} multiline rows={3} />
                    </div>}
                    action={
                        <Button
                            variant="contained"
                            onClick={() => handleRate()}>
                            Submit
                        </Button>
                    } />
            </Box>
        )
    }

    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress />
            </Backdrop>
            <div className={classes.title}>
                <Typography variant='h4'>Akun Saya</Typography>
            </div>
            <div className={classes.divTab}>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    centered
                >
                    <Tab label="Profil" {...a11yProps(0)} />
                    <Tab label="Alamat" {...a11yProps(1)} />
                    <Tab label="Favorit" {...a11yProps(2)} />
                    <Tab label="Riwayat Belanja"{...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TabProfile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabAddress />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TabFavorite />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TabHistory />
                </TabPanel>
            </div>
        </div>
    )
}
export default Account