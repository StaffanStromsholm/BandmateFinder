import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Avatar from '../Avatar/Avatar.js';
import Grid from '@material-ui/core/Grid';
import MapCluster from '../Map/MapCluster.js';


const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const endpoint = 'http://localhost:5000/getall'

    useEffect(() => {
        setIsLoading(true);
        axios.get(endpoint)
            .then(response => {
                setUsers(response.data);
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (<div className="SearchUsers">
       
        <Grid container
            spacing={0}
            direction="row">
            <Grid item>
            
                <MapCluster users={users} />
            </Grid>
        </Grid>

    </div>
    );
}

export default SearchUsers;