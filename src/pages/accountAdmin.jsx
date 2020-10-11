import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeStyles, TableContainer, Typography, Table, TableBody, 
    TableHead, 
    TableRow, 
    TableCell, 
    Backdrop, 
    CircularProgress,
    Button,
    IconButton,
    Collapse,
    Box,
    Select,
    MenuItem,
    InputLabel} from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {getUserAdmin, URL_IMG, editUser, getUsersByQuery, getUserAdminByID} from "../action"

const useStyles = makeStyles((theme)=>({
    root:{
        paddingTop: "10vh",
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "10vw",
        paddingRight: "10vw"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    filterContainer:{
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    filter:{
        marginRight: 10
    },
    table: {
        '& > *': {
          borderBottom: 'unset',
        }
    }
}))

const AccountAdmin = () =>{
    const [open, setOpen] = React.useState(false)
    const [ID, setID] = React.useState(0)
    const [editIndex, setEditIndex] = React.useState(null)
    const [role, setRole] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [roleFilter, setRoleFilter] = React.useState(0)
    const [statusFilter, setStatusFilter] = React.useState(0)
    const classes = useStyles()
    const dispatch = useDispatch()

    const {loading, user, role_id} = useSelector((state)=>{
        return{
            loading: state.userReducer.loadingGet,
            user: state.userReducer.user,
            role_id: state.userReducer.role
        }
    })

    React.useEffect(()=>{
        if(role_id === 1){
            dispatch(getUserAdmin())
        }else{
            dispatch(getUserAdminByID(localStorage.getItem("id")))
        }
    },[])

    const renderTableHead = ()=>{
        return(
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                {role_id === 1?(<TableCell>Action</TableCell>) : null}
            </TableRow>
        )
    }

    const handleEdit = (id,index)=>{
        setEditIndex(id)
        setRole(user[index].role_id)
        setStatus(user[index].status_id)
    }

    const handleOpen = (id)=>{
        setOpen(!open)
        setID(id)
    }

    const handleSimpan = (id)=>{
        const body ={
            role_id: role,
            status_id: status
        }
        dispatch(editUser(body, id))
        setEditIndex(null)
        console.log(body)
    }

    const handleFilterRole = (event)=>{
        setRoleFilter(event.target.value)
    }
    const handleFilterStatus = (event)=>{
        setStatusFilter(event.target.value)
    }
    const handleFilter = ()=>{
        let query = ""
        if(roleFilter !== 0 ){
            query += `role_id=${roleFilter}&`
        }
        if(statusFilter !== 0){
            query += `status_id=${statusFilter}`
        }
        dispatch(getUsersByQuery(query))
    }
    const renderTableBody = () =>{
        return user.map((item,idx)=>{
            return(
                <>
                <TableRow key={item.id} className={classes.table}> 
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() =>handleOpen(item.id)}>
                            {open && item.id === ID? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    {item.id === editIndex?(
                    <>
                        <TableCell>
                            <Select
                                variant="outlined"
                                value={role}
                                onChange={(event)=>setRole(event.target.value)}>
                                <MenuItem value={1}>Super Admin</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>User</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <Select
                                variant="outlined"
                                value={status}
                                onChange={(event)=>setStatus(event.target.value)}>
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={2}>Non-Active</MenuItem>
                            </Select>
                        </TableCell>
                    </>):(<>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.status}</TableCell>
                    </>)}
                    {role_id === 1?(
                        <TableCell>
                            {item.id === editIndex?(
                            <>
                                <Button variant="contained" onClick={()=>handleSimpan(item.id)}>Simpan</Button>
                                <Button variant="contained" onClick={()=>setEditIndex(null)}>
                                    Batal
                                </Button>
                            </>):
                            (<Button size="small" variant="contained" onClick={()=>handleEdit(item.id, idx)}>
                                Edit Akun
                            </Button>)}
                            
                        </TableCell>
                        ): null
                    }
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open && item.id === ID} timeout="auto" unmountOnExit>
                            <Box>
                                <Typography>Profile</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Full Name</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Gender</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Main Address ID</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          <TableRow>
                                            <TableCell>{item.user_fullname}</TableCell>
                                            <TableCell>{item.phone}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell><img src={URL_IMG + item.image} width="100px" alt="profile-pic"/> </TableCell>
                                            <TableCell>{item.main_address_id}</TableCell>
                                          </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography>Address</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Address ID</TableCell>
                                            <TableCell>Address Type</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>City</TableCell>
                                            <TableCell>Province</TableCell>
                                            <TableCell>Postcode</TableCell>
                                            <TableCell>Latitude</TableCell>
                                            <TableCell>Longitude</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {item.address_id? (item.address_id.map((value,index)=>{
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>{value}</TableCell>
                                                    <TableCell>{item.address_type? item.address_type[index]:null}</TableCell>
                                                    <TableCell>{item.address? item.address[index] : null}</TableCell>
                                                    <TableCell>{item.city? item.city[index] : null}</TableCell>
                                                    <TableCell>{item.province?item.province[index]: null}</TableCell>
                                                    <TableCell>{item.postcode?item.postcode[index]: null}</TableCell>
                                                    <TableCell>{item.latitude?item.latitude[index]:null }</TableCell>
                                                    <TableCell>{item.longitude? item.longitude[index]: null}</TableCell>
                                                </TableRow>
                                            )
                                        })): null}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
                </>
            )
        })
    }

    return(
        <div className={classes.root}>
             <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <Typography>Admin Page</Typography>
            {role_id === 1?( <div className={classes.filterContainer}>
                <div className={classes.filter}>
                    <InputLabel>Filter By Role</InputLabel>
                    <Select
                        variant="outlined"
                        value={roleFilter}
                        onChange={handleFilterRole}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={1}>Super Admin</MenuItem>
                        <MenuItem value={2}>Admin</MenuItem>
                        <MenuItem value={3}>User</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel>Filter By Status</InputLabel>
                    <Select
                        variant="outlined"
                        value={statusFilter}
                        onChange={handleFilterStatus}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={2}>Non-active</MenuItem>
                    </Select>
                </div>
                <Button 
                    variant="contained"
                    onClick={handleFilter}>
                    Filter
                </Button>
            </div>

            ): null}
           
            <TableContainer>
                <Table>
                    <TableHead>
                        {renderTableHead()}
                    </TableHead>
                    <TableBody>
                        {renderTableBody()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AccountAdmin