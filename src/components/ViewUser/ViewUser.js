import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewUser = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const endpoint = `http://localhost:5000/getuser/${username}`;

    useEffect(()=>{
        setIsLoading(true);
        axios.get(endpoint)
        .then(response => setUser(response.data.user))
        .catch(err => console.log(err));
        setIsLoading(false);
    }, []);

    return (
        <div className="ViewUser">
            {isLoading && <h1>Loading...</h1>}

            {!isLoading && <div> <h2>{user.username}</h2>
            <p>Intruments: {user.instrument}</p>
                    <p>Postal Code: {user.postalCode}</p>
                    <p>Level: {user.skillLevel}</p>
                    <p>Bands:</p>
                    {/* {user.bands.map(band => <span>{band} </span>)} */}
                    <p>Looking For Bands: {user.lookingForBands}</p>
                    <p>Loking for people to jam with: {user.lookingForPeopleToJamWith}</p>
                    <p>Other info: {user.otherInfo}</p>
                    <p>Gear: {user.gear}</p>
                    <p>Media: </p>
                    {/* {user.media.map(media => <span>{media} </span>)} */}
                    <p>Contact: {user.email}</p> </div>}
                    </div>
    )
}

export default ViewUser;