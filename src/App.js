import React from 'react';
import { Provider } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
