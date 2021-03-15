// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ViewUser = () => {
//     const { username } = useParams();
//     const [user, setUser] = useState({});
//     const [isLoading, setIsLoading] = useState();

//     const endpoint = `http://localhost:5000/getuser/${username}`;

//     // useEffect(()=>{
//     //     setIsLoading(true);
//     //     axios.get(endpoint)
//     //     .then(response => {
//     //         setUser(response.data.user);
//     //         setIsLoading(false);
//     //     })
//     //     .catch(err => console.log(err));
//     // }, []);

//     useEffect(async()=>{
//         try {
//             setIsLoading(true);
//             const response = await axios.get(endpoint);
//             setUser(response.data.user);
//             setIsLoading(false);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }, []);

//     return (
//         <div className="ViewUser">
//             {isLoading && <h1>Loading...</h1>}

//             {!isLoading && <div> <h2>{user.username}</h2>
//             <p><strong>Intruments:</strong> {user.instrument}</p>
//                     <p><strong>Postal Code:</strong> {user.postalCode}</p>
//                     <p><strong>Level:</strong> {user.skillLevel}</p>
//                     {/* <p><strong>Bands:</strong> {user.bands.map((band, index) => <span key={index}>{band.band} </span>)}</p> */}

//                     <p><strong>Looking For Bands:</strong> {user.lookingForBands && <span>Yes</span>} {!user.lookingForBands && <span>No</span>}</p>
//                     <p><strong>Loking for people to jam with:</strong> {user.lookingForPeopleToJamWith && <span>Yes</span>} {!user.lookingForPeopleToJamWith && <span>No</span>}</p>
//                     <p><strong>Summary:</strong> {user.summary}</p>
//                     <p><strong>Gear:</strong> {user.gear}</p>
//                     {/* <p><strong>Media:</strong> </p>
//                     {user.media.map((media, index) => <span key={index}>{media} </span>)} */}
//                     <p><strong>Contact:</strong> {user.email}</p> </div>}
//                     </div>
//     )
// }

// export default ViewUser;

// ====================

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Avatar from '../Avatar/Avatar.js';
import Map from '../Map/Map.js';

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        margin: "1rem"
    },
    media: {
        height: 140,
    },
});

const ViewUser = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState();

    const classes = useStyles();

    const endpoint = `http://localhost:5000/getuser/${username}`;

    useEffect(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(endpoint);
            setUser(response.data.user);
            setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (

        <Card className={classes}>
            
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6}>
                                <Map address={`${user.city}, ${user.postalCode}`} />
                            </Grid>
                            <Grid item xs={12} sm={5} md={6}>

                            <Avatar user={user} />
                            <Typography gutterBottom variant="h5" component="h2">
                                {user.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Summary: </strong>{user.summary}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Main Instrument: </strong>{user.primaryInstrument}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Skill Level: </strong>{user.skillLevel}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Postal Code: </strong>{user.postalCode}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Other intsruments: </strong>{user.otherInstruments}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Genres: </strong>{user.genres}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Bands: </strong>{user.bands}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Looking For Bands: </strong>{user.lookingForBands && <span>Yes</span>} {!user.lookingForBands && <span>No</span>}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Gear: </strong>{user.gear}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Contact: </strong>{user.email}
                            </Typography>
                            </Grid>

                        </Grid>
                        </Card>




    );
}

export default ViewUser;