// Finnlay Ernst 2020
// Purpose: Main Redux store for the application 

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import usersReducer from './reducers/users';

// Using thunk middleware for async requests
const store = createStore(usersReducer, applyMiddleware(thunk));

export default store;
