import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../SearchUsers/Map.module.scss';
import { instruments } from '../../constants.js';

export default function UserList({filteredUsers}) {
    return (
        
            <div className={styles.userList}>
                {filteredUsers.map((user) => (
                    <div className={styles.userList}>
                        <img
                            className={styles.smallImg}
                            src={instruments[user.primaryInstrument]}
                        />
                        <Link
                            to={`/BandmateFinder-client/users/${user.username}`}
                        >
                            {user.username} - {user.city}
                        </Link>
                    </div>
                ))}
            </div>
       
    )
}
