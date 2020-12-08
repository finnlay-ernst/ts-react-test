// Finnlay Ernst 2020
// Purpose: Top level composition of components and basic page styling

// React & Redux Imports
import React from 'react';
import { Provider } from 'react-redux';

// MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// File/Component Imports
import store from './state';
import UserTable from './features/UserTable';
import DownloadUsers from './features/DownloadUsers';

const useStyles = makeStyles({
	root: {		
	}
});

function App() {
	const classes = useStyles();
	return <Provider store={store}>
		<div className={classes.root}>
			<Typography variant="h2">
				User Table
			</Typography>
			<UserTable />	
			<DownloadUsers />
		</div>
	</Provider>;
}

export default App;
