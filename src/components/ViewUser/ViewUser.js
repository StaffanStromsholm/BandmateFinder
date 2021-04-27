import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import styles from './ViewUser.module.scss';
import * as api from '../../api/index.js';
import { instruments } from '../../config';

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

    if (isLoading || !user.lookingFor) {
        return <h1>Loading...</h1>
    }

    return (
            <div className={styles.ViewUser}>
                <div className={styles.instrumentWrapper}><img className={styles.instrument} src={instruments[user.primaryInstrument]} /></div>
                <div className={styles.infoWrapper}>
                <h1>{user.username} </h1> 

                <h3>{user.primaryInstrument}</h3>
                <h3>{user.city}</h3>
                <h3>Looking for: {user.lookingFor.bands && 'bands'}{user.lookingFor.jams && ', jams'}{user.lookingFor.studioWork && ', studio work'}{user.lookingFor.songWriting && ', song writing'}</h3>
                <h3>{user.skillLevel}</h3>
                <h3>{user.freeText}</h3>
                </div>
            </div>
    );
}

export default ViewUser;