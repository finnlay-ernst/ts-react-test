import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { getUsers } from '../state/actions/users';

const useStyles = makeStyles({
    table: {
      width: "100%",
      maxHeight: "300px",
    },
    row: {
        '& > *': {
          borderBottom: 'unset',
        },
    }
});

function UserTableRow({ user }) {
    const { id, email, first_name, last_name, avatar} = user;

    const classes = useStyles();
    const [avatarDetail, setAvatarDetail] = useState(false);

    return  <React.Fragment>
            <TableRow className={classes.row}>        
                <TableCell>
                    <IconButton aria-label="avatar detail button" size="small" onClick={() => setAvatarDetail(!avatarDetail)}>
                        {avatarDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}                        
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{id}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{first_name}</TableCell>
                <TableCell align="left">{last_name}</TableCell>                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={avatarDetail} timeout="auto" unmountOnExit>
                        Avatar Link: {avatar}
                    </Collapse>
                </TableCell>
            </TableRow>
    </React.Fragment>
}

export default function UserTable() {
    // Redux Hooks
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Get users from the API on component mount (or if dispatch changes)
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    }

    const handleChangePage = () => {}

    return <div>
        <TableContainer className={classes.table} component={Paper}>
            <Table stickyHeader aria-label="user table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user, i) => <UserTableRow key={i} user={user} />)}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>;
}
