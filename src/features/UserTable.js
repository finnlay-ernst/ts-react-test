import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getUsers } from '../state/actions/users';

const useStyles = makeStyles({
    table: {
      width: '100%',
    },
});

export default function UserTable() {
    // State Hooks
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const classes = useStyles();
    
    // Get users from the API on component mount (or if dispatch changes)
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    return <div>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="user table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Avatar URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">{user.id}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.first_name}</TableCell>
                            <TableCell align="left">{user.last_name}</TableCell>
                            <TableCell align="left">{user.avatar}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>;
}
