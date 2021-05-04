import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './CreateComment.module.scss';
import * as api from '../../../api/index.js';

export default function CreateComment({user}) {
    const [comment, setComment] = useState({text: ''});
    const [loggedInUser, setLoggedInUser] = useState();

    const onChangeHandler = (e) => {
        setComment({text: e.target.value});
    }

    const submitHandler = (e) => {
        console.log(loggedInUser);
        e.preventDefault();
        const author = localStorage.getItem('user')
        axios.post(`http://localhost:5000/users/${user._id}/comments`, {comment, commentReceiverId: user._id, authorId: loggedInUser._id, authorUsername: loggedInUser.username})
    }

    useEffect(() => {
        const unparsedsedLoggedInUser = localStorage.getItem('user');
        const loggedInUser = JSON.parse(unparsedsedLoggedInUser);
        api.fetchUser(loggedInUser)
        .then(response => setLoggedInUser(response.data));
    }, [])

    return (
        <div classname={styles.CreateComment}>
            <form onSubmit={submitHandler}>
                <input onChange={onChangeHandler} type="text" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
