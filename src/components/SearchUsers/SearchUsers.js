import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import MapCluster from './MapCluster.js';
import * as api from '../../api/index.js';
import Loader from '../UI/Animation/Loader';

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
        return <Loader />
    }

    return (<div className={styles.SearchUsers}>
        <MapCluster users={users} />
    </div>
    );
}

export default SearchUsers;