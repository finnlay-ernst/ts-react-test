import axios from 'axios';

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
        return axios.get("https://reqres.in/api/users")
        .then(({ data }) => {
            console.log("success", data);
            // Save data in state using the fulfilled action
            dispatch(getUsersFulfilled(data.data));            
        })
        .catch(err => {
            console.log("error", err);            
            dispatch(getUsersRejected(err));
        });
    }
}
