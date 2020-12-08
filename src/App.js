import React from 'react';
import { Provider } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import store from './state';
import UserTable from './features/UserTable';

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		// display: "flex",
		// flexDirection: "column",
		// alignItems: "center",
		// justifyContent: "center",		
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
		</div>
	</Provider>;
}

export default App;
