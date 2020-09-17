import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { getProfile, getFavorite } from '../action'

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
        >
            <Box p={3}>
                <h1>{children}</h1>
            </Box>
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
            favorite: state.profileReducer.favorite
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getProfile(13))
        dispatch(getFavorite(13))
    }, [])

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const TabProfile = (props) => {
        const { children, value, index } = props;
        return profile.map((item, ind) => {
            return (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`vertical-tabpanel-${index}`}
                    key={ind}
                >
                    <Box p={3} className={classes.box}>
                        <h1>{item.user_id}</h1>
                        <h1>{item.phone}</h1>
                        <h1>{item.gender}</h1>
                        <Button onClick={() => console.log('test')}>Test</Button>
                    </Box>
                </div>
            )
        })
    }
    const TabFavorite = (props) => {
        const { children, value, index } = props;
        return favorite.map((item, ind) => {
            return (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`vertical-tabpanel-${index}`}
                    key={ind}
                >
                    <Box p={3}>
                        <h1>{item.product_id}</h1>
                        <h1>{item.color_id}</h1>
                        <h1>{item.qty}</h1>
                        <h1>{item.price_each}</h1>
                        <Button onClick={() => console.log('test')}>Test</Button>
                    </Box>
                </div>
            )
        })
    }
    const TabSetting = (props) => {
        const { children, value, index } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
            >
                <Box p={3}>
                    <Button onClick={() => console.log('test')}>Test</Button>
                </Box>
            </div>
        )
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
                <TabProfile value={value} index={0} />
                <TabFavorite value={value} index={1} />
                <TabPanel value={value} index={2}>
                    Item Three
            </TabPanel>
                <TabPanel value={value} index={3}>
                    Setting
            </TabPanel>
            </div>
        </div>
    )
}
export default Account