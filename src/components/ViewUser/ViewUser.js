import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import styles from './ViewUser.module.scss';
import * as api from '../../api/index.js';

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        margin: "1rem"
    },
    media: {
        height: 100,
    },
});

const ViewUser = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState();

    const classes = useStyles();

    // const endpoint = `http://localhost:5000/getuser/${username}`;

    useEffect(async () => {
        setIsLoading(true)
        api.fetchUser(username)
        .then(response => {
            setUser(response.data)
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
            <div className={styles.ViewUser}>
                {user.username}
            </div>
    );
}

export default ViewUser;