// Finnlay Ernst 2020
// Purpose: Actions relating to acquiring user data from the API endpoint 

import axios from 'axios';

export const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
export const GET_USERS_REJECTED = 'GET_USERS_REJECTED';

// Sucessful GET request action
const getUsersFulfilled = users => {
    return {
        type: GET_USERS_FULFILLED,
        payload: users
    }
}

// Request failure action
const getUsersRejected = err => {    
    return {
        type: GET_USERS_REJECTED,
        error: err
    }
}

// Action creator for getting user data
export const getUsers = () => {    
    return dispatch => {        
        return axios.get("https://reqres.in/api/users")
        .then(({ data }) => {            
            // Save data in state using the fulfilled action
            dispatch(getUsersFulfilled(data.data));            
        })
        .catch(err => {               
            dispatch(getUsersRejected(err));
        });
    }
}
