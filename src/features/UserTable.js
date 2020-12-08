// Finnlay Ernst 2020
// Purpose: Table for displaying user data. Includes sorting & pagination among other features. Largely based on MUI library examples (see https://material-ui.com/). 

// React & Redux Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// File/Component Imports
import { getUsers } from '../state/actions/users';
import DownloadUsers from './DownloadUsers';

const useStyles = makeStyles({
	root: {
		marginLeft: "auto",
		marginRight: "auto",
		width: "80%",
	},
	table: {
		maxHeight: "300px"
	},
	row: {
		"& > *": {
		  borderBottom: "unset",
		},
	},
	tableFooter: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

// Table columns (id is corresponding the name of the property in the user object)
const columns = [
	{id: "id", label: "ID"}, 
	{id: "email", label: "Email"}, 
	{id: "first_name", label: "First Name"}, 
	{id: "last_name", label: "Last Name"}
];

// More advanced table header facilitating sorting of columns
function UserTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
  
	return (
	  <TableHead>
		<TableRow>
			<TableCell/>
			{columns.map((attribute, i) => (
				<TableCell
					key={i}
					align="center"              
					sortDirection={orderBy === attribute.id ? order : false}
				>
					<TableSortLabel
						active={orderBy === attribute.id}
						direction={orderBy === attribute.id ? order : 'asc'}
						onClick={createSortHandler(attribute.id)}
					>
						{attribute.label}
					</TableSortLabel>
				</TableCell>
			))}
		</TableRow>
	  </TableHead>
	);
}

// Table row with capability for toggling collapsible info
function UserTableRow({ user }) {
	const { id, email, first_name, last_name, avatar} = user;
	
	const classes = useStyles();	
	const [avatarDetail, setAvatarDetail] = useState(false);
	
	// If user switching sorting changes the user in this row close the extra detail
	useEffect(() => {
		setAvatarDetail(false);
	}, [id]);

	return <React.Fragment>
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
						<Avatar alt={`${first_name} ${last_name}`} src={avatar} />
						Avatar Link: {avatar}
					</Collapse>
				</TableCell>
			</TableRow>
	</React.Fragment>
}

// Basic comparator, takes in two objects and a property to compare them on
const comparator = (x, y, property) => {
	if (x[property] > y[property]) {
		return -1;
	}
	else if (x[property] < y[property]) {
		return 1;
	}
	else {
		return 0;
	}
}

// Returns appropriate comparator for ordering (asc or desc)
const getComparator = (order, orderBy) => {
	// TODO: stable sorting to prevent elements being needlessly switched
	return order === 'desc'
    	? (x, y) => comparator(x, y, orderBy)
    	: (x, y) => -comparator(x, y, orderBy);
}

// Main table component
export default function UserTable() {
	// Redux Hooks
	const users = useSelector(state => state.users);
	const dispatch = useDispatch();

	const classes = useStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState(columns[0]);
	
	// Get users from the API on component mount (or if dispatch changes)
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);
	
	const handleRequestSort = (event, attribute) => {
		const isAsc = orderBy === attribute && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(attribute);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	}

	return <div className={classes.root}>
		<Paper>
			<TableContainer className={classes.table} component={Paper}>
				<Table stickyHeader aria-label="user table">
					<UserTableHead 
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{users
							.sort((x, y) => getComparator(order, orderBy)(x, y))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((user, i) => <UserTableRow key={i} user={user} />)}
					</TableBody>
				</Table>
			</TableContainer>
			<div className={classes.tableFooter}>
				<DownloadUsers /> 
				<TablePagination
					rowsPerPageOptions={[2, 5, 10, 25]}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</Paper> 
	</div>;
}
