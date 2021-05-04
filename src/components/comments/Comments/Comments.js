import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import styles from './Comments.module.scss';

const Comments = ({ comments, user }) => {
    const history = useHistory();

    const onClickhandler = (url) => {
        //refresh action
        history.push('/BandmateFinder-client');
        setTimeout(()=>{
            history.push(url);
        }, 10)
    }

    return (
        <div className={styles.comments}>
            <ul>
                {comments.slice('').reverse().map((comment, index) => <li key={index} className={`${user.username === comment.author.username ? styles.usersOwnComment : ' '}`}>
                                            <p onClick={() => onClickhandler(`/BandmateFinder-client/users/${comment.author.username}`)}> 
                                                {user.username === comment.author.username && <span className={styles.dot}>● </span>} {comment.author.username}
                                            </p> <br/>
                                            <span>{comment.created.substring(0, 10)}</span> <br/>
                                            <p>{comment.text} </p>
                                        </li>)}
            </ul>
        </div>
    )
}

export default Comments;