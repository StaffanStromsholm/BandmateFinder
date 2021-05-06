import React, { useEffect, useState } from 'react';
import './styles.css';
import MapCluster from './MapCluster.js';
import * as api from '../../api/index.js';

const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async() => {
        setIsLoading(true);
        api.fetchUsers()
        .then(response => {
            setUsers(response.data)
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (<div className="SearchUsers">
        <MapCluster users={users} />
    </div>
    );
}

export default SearchUsers;