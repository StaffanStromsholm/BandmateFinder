import React from 'react'
import { Link } from 'react-router-dom';
import { instruments } from '../../constants.js';
import styles from '../SearchUsers/Map.module.scss';

export default function ViewUser({clickedUser}) {
    return (
        <div key={Math.random()} className={styles.ViewUser}>
                        <div className={styles.instrumentWrapper}>
                            <img
                                className={styles.instrument}
                                src={instruments[clickedUser.primaryInstrument]}
                            />
                        </div>
                        <div className={styles.infoWrapper}>
                            <h1>{clickedUser.username} </h1>

                            <h3> {clickedUser.primaryInstrument}</h3>
                            <p>
                                <i className="fas fa-map-marker"></i>{" "}
                                {clickedUser.city}
                            </p>
                            <p>
                                <i className="fas fa-binoculars"></i> Looking
                                for: {clickedUser.lookingFor.bands && "bands"}{" "}
                                {clickedUser.lookingFor.jams && "jams"}{" "}
                                {clickedUser.lookingFor.studioWork &&
                                    "studio work"}{" "}
                                {clickedUser.lookingFor.songWriting &&
                                    "songwriting"}
                            </p>
                            <p>
                                <i className="fas fa-star"></i>{" "}
                                {clickedUser.skillLevel}
                            </p>
                            <p>
                                <i className="fas fa-user"></i>{" "}
                                {clickedUser.freeText.substring(0, 30)}...
                            </p>
                            <Link
                                to={`/BandmateFinder-client/users/${clickedUser.username}`}
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
    )
}
