import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import styles from './ViewUser.module.scss';
import * as api from '../../api/index.js';
import { instruments } from '../../constants';
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

const ViewUser = () => {
    //grab the username from url
    const { username } = useParams();
    //grab data about the viewed user from the DB and set it to user
    const [user, setUser] = useState({});
    //grab data about loggedInUser
    const [loggedInUser, setLoggedInUser] = useState();
    const [isLoading, setIsLoading] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        setIsLoading(true)
        //grab logged in users info
        const unparsedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(unparsedUser);
        api.fetchUser(parsedUser)
        .then(response => setLoggedInUser(response.data))
        //grab viewed users info
        
        api.fetchUser(username)
            .then(response => {
                setUser(response.data);
                setComments(response.data.comments);
                setIsLoading(false);
            })
    }, []);

    //make sure all data needed is fetched before rendering
    if (isLoading || !user.lookingFor || !loggedInUser) {
        return <h1 className={styles.ViewUser}>Loading...</h1>
    }

    return (
        <div className={styles.ViewUser}>
            <div className={styles.instrumentWrapper}><img className={styles.instrument} src={instruments[user.primaryInstrument]} /></div>
            <div className={styles.infoWrapper}>
                <h1>{user.username} </h1>
                <p>Joined {user.joined.substring(0, 10)} </p>
                <p>{user.email}</p>
                <p><i className="fas fa-music"></i> {user.primaryInstrument}</p>
                <p><i className="fas fa-map-marker"></i> {user.city}</p>
                <p><i className="fas fa-binoculars"></i> {user.lookingFor.bands && ' bands '}{user.lookingFor.jams && ' jams '}{user.lookingFor.studioWork && ' studio work '}{user.lookingFor.songWriting && ' songwriting'}</p>
                <p><i className="fas fa-star"></i> {user.skillLevel}</p>
                <p><i className="fas fa-user"></i></p>
                <p className={styles.bio}>{user.freeText}</p>

                <CreateComment user={user} />
                <Comments className={styles.comments} user={user} comments={comments}/>
                
            </div>
            
        </div>
    );
}

export default ViewUser;