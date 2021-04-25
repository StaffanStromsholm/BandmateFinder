import axios from 'axios';
import React, {useEffect} from 'react';
import './styles.css';

const EditProfile = ({user}) => {
    useEffect(() => {
        axios.get('')
    })
    return(
        <div className="EditProfile">
            {user}
        </div>
    )
}

export default EditProfile;