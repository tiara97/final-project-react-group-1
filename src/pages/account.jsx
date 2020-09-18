import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { getProfile, getFavorite, userOrder, userLogin } from '../action'

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
        >
            {children}
        </div>
    );
}

// props untuk tab doang
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        height: 224,
        paddingTop: '10vh'
    },
    box: {
        backgroundColor: 'pink'
    },
    divTab: {
        display: 'flex'
    },
    tabs: {
        borderRight: `px solid ${theme.palette.divider}`,
    },
}));


const Account = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { profile, favorite } = useSelector((state) => {
        return {
            profile: state.profileReducer.profile,
            favorite: state.profileReducer.favorite,
            order: state.profileReducer.order
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getProfile())
        dispatch(getFavorite())
        dispatch(userOrder())
    }, [])

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const TabProfile = (props) => {
        return profile.map((item, ind) => {
            return (
                    <Box p={3} className={classes.box}>
                        <h1>{item.user_id}</h1>
                        <h1>{item.phone}</h1>
                        <h1>{item.gender}</h1>
                        <Button onClick={() => console.log('test')}>Test</Button>
                    </Box>
            )
        })
    }
    const TabFavorite = (props) => {
        return favorite.map((item, ind) => {
            return (
                <Box p={3}>
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
    //             <Box p={3}>
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
        //         <Box p={3}>
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