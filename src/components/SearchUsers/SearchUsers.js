// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './styles.css';

// const SearchUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const endpoint = 'http://localhost:5000/getall'

//     useEffect(() => {
//         setIsLoading(true);
//         axios.get(endpoint)
//         .then(response => {
//             setUsers(response.data);
//             setIsLoading(false)
//         } )
//         .catch(err => console.log(err))
//     }, [])

//     return (
//         <div className="SearchUsers">
//             {isLoading && <h1>Loading...</h1>}
//             {!isLoading && users.map(user =>
//                 <div key={user._id}>
//                     <Link to={`/users/${user.username}`}>{user.username}</Link>
//                     <p>Intruments: {user.instrument}</p>
//                     <p>Postal Code: {user.postalCode}</p>
//                     <p>Level: {user.skillLevel}</p>
//                     {/* <p>Bands: {user.bands.join(', ')}</p>
//                     <p>Looking For Bands: {user.lookingForBands}</p>
//                     <p>Loking for people to jam with: {user.lookingForPeopleToJamWith}</p>
//                     <p>Other info: {user.otherInfo}</p>
//                     <p>Gear: {user.gear}</p>
//                     <p>Media: {user.media.join(', ')}</p>
//                     <p>Contact: {user.email}</p> */}
//                 </div>)}

//         </div>
//     )
// }

// export default SearchUsers;


// ========

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Avatar from '../Avatar/Avatar.js';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MapCluster from '../Map/MapCluster.js';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
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

        <TextField label="search by instruments"> </TextField>
        <Grid container
            spacing={0}
            direction="row"
            style={{}}
        >

            {users.map(user =>

                <Grid item xs={12} sm={4}>
                    <Card style={{ margin: "1rem", minHeight: "300px" }} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Avatar user={user} />
                                <Typography gutterBottom variant="h5" component="h2">
                                    {user.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {user.summary}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Intrument: </strong>{user.primaryInstrument}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Skill Level: </strong>{user.skillLevel}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/users/${user.username}`}><Button size="small" color="primary">
                                Read More
       </Button></Link>
                        </CardActions>
                    </Card>
                </Grid>

            )}
            <Grid item>
                 <MapCluster users={users} />

            </Grid>
        </Grid>

    </div>
    );
}

export default SearchUsers;