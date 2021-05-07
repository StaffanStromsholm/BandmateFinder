import React from "react";
import { Link } from "react-router-dom";
import styles from "../SearchUsers/Search.module.scss";
import { instruments } from "../../constants.js";

export default function UserList({ filteredUsers }) {
    return (
        <div className={styles.userList}>
            {/* sort uers alphabetically by city */}
            {filteredUsers
                .sort(function (a, b) {
                    return a.city.localeCompare(b.city);
                })
                .map((user) => (
                    <div key={Math.random()} className={styles.userListItem}>
                        <div className={styles.instrumentWrapper}>
                            <img
                                className={styles.instrument}
                                src={instruments[user.primaryInstrument]}
                            />
                        </div>
                        <div className={styles.infoWrapper}>
                            <h2>{user.username} </h2>

                            <h3> {user.primaryInstrument}</h3>
                            <p>
                                <i className="fas fa-map-marker"></i>{" "}
                                {user.city}
                            </p>
                            <p>
                                <i className="fas fa-binoculars"></i> Looking
                                for: {user.lookingFor.bands && "bands"}{" "}
                                {user.lookingFor.jams && "jams"}{" "}
                                {user.lookingFor.studioWork &&
                                    "studio work"}{" "}
                                {user.lookingFor.songWriting &&
                                    "songwriting"}
                            </p>
                            <p>
                                <i className="fas fa-star"></i>{" "}
                                {user.skillLevel}
                            </p>
                            <p>
                                <i className="fas fa-user"></i>{" "}
                                {user.freeText.substring(0, 30)}...
                            </p>
                            <Link
                                to={`/BandmateFinder-client/users/${user.username}`}
                            >
                                Visit profile
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
}
