import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Avatar from '../Avatar/Avatar.js';
import Grid from '@material-ui/core/Grid';
import MapCluster from '../Map/MapCluster.js';
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