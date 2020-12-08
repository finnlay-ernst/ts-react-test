import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUsers } from '../state/actions/users';

export default function UserTable() {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    
    // Get users from the API on component mount (or if dispatch changes)
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    return <div>        
        {JSON.stringify(users)}
    </div>;
}
