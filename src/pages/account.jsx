import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button, Typography } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSelector, useDispatch } from "react-redux"
import { getProfile, getFavorite, userOrder, userLogin } from '../action'
import {URL_IMG} from '../action/helper'

import {uploadPic} from '../action'
import avatar from '../assets/avatar.jpg'

function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            className={classes.tabPanel}
        >
            {children}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        // display: 'flex',
        // flexDirection: 'column',
        height: 224,
        paddingTop: '10vh'
    },
    box: {
        backgroundColor: 'pink',
        height: '40vh',
    },
    boxProfile: {
        backgroundColor: 'pink',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-between'
    },
    divTab: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    tabs: {
        borderRight: `px solid ${theme.palette.divider}`,
        width: '13vw'
    },
    tabPanel: {
        flexGrow: 1
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
        backgroundColor: '#f2f2f2',
        padding: '10px',
    },
    divInfo: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lavender',
        padding: '10px 40px',
    },
}));


const Account = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { profile, favorite, error, order } = useSelector((state) => {
        return {
            profile: state.profileReducer.profile,
            favorite: state.profileReducer.favorite,
            error: state.profileReducer.error,
            order: state.orderReducer.order
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getProfile())
        dispatch(getFavorite())
        dispatch(userOrder())
    }, [])

    // fungsi untuk ganti tab
    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    // fungsi untuk upload picture
    // udh bisa upload tp fotonya ga nongol????
    const handleUpload = (props) => {
        let fileProps = props.target.files[0]
        console.log(fileProps)
        let data = new FormData()
        data.append('IMG', fileProps)
        console.log(data)
        dispatch(uploadPic(data))
    };

    const TabProfile = (props) => {
        return profile.map((item, ind) => {
            return (
                <Box p={3} className={classes.boxProfile}>
                    <div className={classes.divAvatar}>
                        <div className={classes.avatar}>
                            <img src={item.image ? URL_IMG + item.image : avatar} width="100%" alt="profile-img" style={{ borderRadius: '50%' }}></img>
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
                            <Button variant="contained" color="primary" component="span"
                                startIcon={<PhotoCamera />}>
                                Upload
                            </Button>
                        </label>
                    </div>
                    <div className={classes.divInfo}>
                        <h1>{item.user_id}</h1>
                        <h1>{item.phone}</h1>
                        <h1>{item.gender}</h1>
                    </div>
                </Box>
            )
        })
    }
    const TabFavorite = (props) => {
        return favorite.map((item, ind) => {
            return (
                <Box p={3} className={classes.box}>
                    <h1>{item.product_id}</h1>
                    <h1>{item.color_id}</h1>
                    <h1>{item.qty}</h1>
                    <h1>{item.price_each}</h1>
                    <Button onClick={() => console.log('test')}>Test</Button>
                </Box>
            )
        })
    }
    // const TabHistory = (props) => {
    //     return order.map((item, ind) => {
    //         return (
    //             <Box p={3} className={classes.box}>
    //                 <h1>{item.product_id}</h1>
    //                 <h1>{item.color_id}</h1>
    //                 <h1>{item.qty}</h1>
    //                 <h1>{item.price_each}</h1>
    //                 <Button onClick={() => console.log('test')}>Test</Button>
    //             </Box>
    //         )
    //     })
    // }
    const TabUser = (props) => {
        // return order.map((item, ind) => {
        //     return (
        //         <Box p={3} className={classes.box}>
        //             <h1>{item.product_id}</h1>
        //             <h1>{item.color_id}</h1>
        //             <h1>{item.qty}</h1>
        //             <h1>{item.price_each}</h1>
        //             <Button onClick={() => console.log('test')}>Test</Button>
        //         </Box>
        //     )
        // })
    }
    return (
        <div className={classes.root}>
            <div>
                <h1>Akun Saya</h1>
            </div>
            <div className={classes.divTab}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Profil" />
                    <Tab label="Favorit" />
                    <Tab label="Riwayat Belanja" />
                    <Tab label="Pengaturan" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TabProfile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabFavorite />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Test
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Setting
                </TabPanel>
            </div>
        </div>
    )
}
export default Account