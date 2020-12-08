import React from 'react';
import { Provider } from 'react-redux';

import store from './state';
import UserTable from './features/UserTable';

function App() {
	return <Provider store={store}>
		<UserTable />
		<span>Created by Finnlay Ernst 2020</span>
		<br/>
		<a href="https://github.com/finnlay-ernst">GitHub</a>
	</Provider>;
}

export default App;
