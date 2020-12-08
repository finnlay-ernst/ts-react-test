import React from 'react';
import { useSelector } from 'react-redux';

export default function UserTable() {
    const users = useSelector(state => state.users);
    return <div>
        Hello World
        {JSON.stringify(users)}
    </div>;
}
