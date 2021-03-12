import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
        } )
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="SearchUsers">
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && users.map(user =>
                <div key={user._id}>
                    <h2>{user.username}</h2>
                    <p>Intruments: {user.instrument}</p>
                    <p>Postal Code: {user.postalCode}</p>
                    <p>Level: {user.skillLevel}</p>
                    <p>Bands: {user.bands.join(', ')}</p>
                    <p>Looking For Bands: {user.lookingForBands}</p>
                    <p>Loking for people to jam with: {user.lookingForPeopleToJamWith}</p>
                    <p>Other info: {user.otherInfo}</p>
                    <p>Gear: {user.gear}</p>
                    <p>Media: {user.media.join(', ')}</p>
                    <p>Contact: {user.email}</p>
                </div>)}
            
        </div>
    )
}

export default SearchUsers;