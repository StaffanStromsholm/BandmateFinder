import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Comments.module.scss';

const Comments = ({ comments }) => {

    return (
        <div className={styles.comments}>
            <ul>
                {comments.map(comment => <li> 
                                            <a href={`/BandmateFinder-client/users/${comment.author.username}`}> 
                                                {comment.author.username}
                                            </a> <br/>
                                            <span>{comment.created.substring(0, 10)}</span> <br/>
                                            <p>{comment.text} </p>
                                        </li>)}
            </ul>
        </div>
    )
}

export default Comments;