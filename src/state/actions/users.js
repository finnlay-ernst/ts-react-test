export const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
export const GET_USERS_REJECTED = 'GET_USERS_REJECTED';

const getUsersFulfilled = users => {
    return {
        type: GET_USERS_FULFILLED,
        payload: users
    }
}

const getUsersRejected = err => {
    return {
        type: GET_USERS_REJECTED,
        error: err
    }
}

export const getUsers = () => {    
    return dispatch => {        
        // TODO: Get users from API
    }
}
