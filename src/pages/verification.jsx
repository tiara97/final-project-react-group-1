import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {userVerify} from '../action'

const Verification = (props) => {
    // declare className
    const classes = useStyles()
    const dispatch = useDispatch()

    const [ verify, setVerify ] = React.useState(false)
    const token = props.location.search.substring(1)
    console.log(token)
    React.useEffect(() => {
        dispatch(userVerify(token))
        setVerify(true)
    }, []);
    return (
        <div className={classes.root}>
            {verify ?
                <div>
                    <h1>Authentication success! :) Selamat belanja!</h1>
                    <Link to='/Login'>
                    <Button variant="contained" color="primary">Login</Button>
                    </Link>
                </div>
                :
                <div>
                    <h1>Authentication error has occured :(</h1>
                </div>
            }
        </div>
    )
}
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'pink',
        width: '100vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10vh'
    }
}))
export default Verification