// Finnlay Ernst 2020
// Purpose: Reducer mapping user related actions to state 

import { GET_USERS_FULFILLED, GET_USERS_REJECTED } from '../actions/users';

// Intialise to no users (empty array)
const initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_FULFILLED: {   
            // Request fulfilled, store user data in state         
            return {
                ...state,
                users: action.payload
            };
        }
        case GET_USERS_REJECTED: {   
            // Request rejected, may want to display an error message in the future         
            return state;
        }
        default:
            return state;
    }
}

export default usersReducer;
