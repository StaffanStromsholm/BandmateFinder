import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import styles from './ViewUser.module.scss';
import * as api from '../../api/index.js';
import { instruments } from '../../config';
import Comments from '../comments/Comments/Comments';
import CreateComment from '../comments/CreateComment/CreateComment';

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        margin: "1rem"
    },
    media: {
        height: 100,
    },
});

const ViewUser = ({loggedInUser}) => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState();
    const [comments, setComments] = useState();

    const classes = useStyles();

    const commentOnClick = () => {

    }

    useEffect(async () => {
        setIsLoading(true)
        api.fetchUser(username)
            .then(response => {
                setUser(response.data);
                setComments(response.data.comments);
                setIsLoading(false);
            })
    }, []);

    //make sure user.lookingFor is not undefined before rendering
    if (isLoading || !user.lookingFor) {
        return <h1 className={styles.ViewUser}>Loading...</h1>
    }

    return (
        <div className={styles.ViewUser}>
            <div className={styles.instrumentWrapper}><img className={styles.instrument} src={instruments[user.primaryInstrument]} /></div>
            <div className={styles.infoWrapper}>
                <h1>{user.username} </h1>
                <p>Joined {user.joined.substring(0, 10)} </p>
                <p>{user.email}</p>
                <p><i class="fas fa-music"></i> {user.primaryInstrument}</p>
                <p><i class="fas fa-map-marker"></i> {user.city}</p>
                <p><i class="fas fa-binoculars"></i> {user.lookingFor.bands && ' bands '}{user.lookingFor.jams && ' jams '}{user.lookingFor.studioWork && ' studio work '}{user.lookingFor.songWriting && ' songwriting'}</p>
                <p><i class="fas fa-star"></i> {user.skillLevel}</p>
                <p><i class="fas fa-user"></i></p>
                <p className={styles.bio}>{user.freeText}</p>
                <CreateComment user={user} />
                <Comments className={styles.comments} comments={comments}/>
            </div>
            
        </div>
    );
}

export default ViewUser;