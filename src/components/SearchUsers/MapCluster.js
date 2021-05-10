import React, { useLayoutEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "../SearchUsers/Search.module.scss";
import FilterByInstrument from "./filterByInstrument.js";
import UserList from './UserList';
import ViewUserCard from './ViewUserCard';
import { renderMap } from '../../utils.js';

const Map = ({ users }) => {
    const [clickedUser, setClickedUser] = useState(null);
    const [filterByInstrument, setFilterByInstrument] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [showUserList, setShowUserList] = useState(false);
    const [showUserCard, setShowUserCard] = useState(false);

    //default location needed to make the map render correctly
    const location = "Helsinki";

    const setFilterByInstrumentHandler = (instrument) => {
        setShowUserCard(false);
        setShowUserList(true);
        if (instrument === "All") {
            console.log(users);
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter((user) => user.primaryInstrument === instrument)
            );
            setFilterByInstrument(instrument);
        }
    };

    // Create a reference to the HTML element we want to put the map on
    const mapRef = React.useRef(null);

    useLayoutEffect(() => {

            renderMap(
                mapRef,
                location,
                filteredUsers,
                setClickedUser,
                users,
                setShowUserList,
                setShowUserCard
            );
        
    }, [filteredUsers]);

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapAndSearch}>
                <div className={styles.userInfoWrapper}>

                    <div>
                        <div id="map" className={styles.map} ref={mapRef} />
                    </div>

                    <FilterByInstrument
                        setFilterByInstrument={setFilterByInstrumentHandler}
                    />

                </div>

                {showUserList && <UserList filteredUsers={filteredUsers} />}

                {clickedUser && showUserCard && <ViewUserCard clickedUser={clickedUser} />}

            </div>
        </div>
    );
};

export default withRouter(Map);