import React, { useLayoutEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './Map.module.scss';
import FilterByInstrument from './FilterByInstrument';
import { makeStyles } from '@material-ui/core/styles';
import { instruments } from '../../config';

import axios from 'axios';

const pinImg = 'https://www.flaticon.com/svg/static/icons/svg/484/484167.svg';

const positionStackAPIKey = 'be2bf278ff4827f8917f1e0ac5f177f9';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Map = ({ users }) => {
  const [location, setLocation] = useState('Helsinki');
  const [clickedUser, setClickedUser] = useState(null);
  const [filterByInstrument, setFilterByInstrument] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showUserList, setShowUserList] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);

  const classes = useStyles();
  const stringCharNr = 20

  const setFilterByInstrumentHandler = (instrument) => {
    setShowUserCard(false);
    setShowUserList(true);
    if (instrument === 'All') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.primaryInstrument === instrument));
      setFilterByInstrument(instrument);
    }
  }

  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  useLayoutEffect(() => {

    renderMap(mapRef, location, filteredUsers, setClickedUser, users, setShowUserList, setShowUserCard);

  }, [filteredUsers]);

  return <div className={styles.mapContainer}>
    

    <div className={styles.mapAndSearch}>

    <div className={styles.userInfoWrapper}>
    <div>
      <div id="map" className={styles.map} ref={mapRef} />
    </div>
    <FilterByInstrument setFilterByInstrument={setFilterByInstrumentHandler} />
    </div>

      {showUserList && <div className={styles.userList}>
                    {filteredUsers.sort().map(user =><div className={styles.userList}><img className={styles.smallImg} src={instruments[user.primaryInstrument]} /><Link to={`/users/${user.username}`}>{user.username} - {user.city}</Link></div> )}
        </div>}

      {clickedUser && showUserCard &&
        <div className={styles.ViewUser}>
          <div className={styles.instrumentWrapper}><img className={styles.instrument} src={instruments[clickedUser.primaryInstrument]} /></div>
          <div className={styles.infoWrapper}>
            <h1>{clickedUser.username} </h1>

            <h3>{clickedUser.primaryInstrument}</h3>
            <h3>{clickedUser.city}</h3>
            <h3>Looking for: {clickedUser.lookingFor.bands && 'bands'}{clickedUser.lookingFor.jams && ', jams'}{clickedUser.lookingFor.studioWork && ', studio work'}{clickedUser.lookingFor.songWriting && ', song writing'}</h3>
            <h3>{clickedUser.skillLevel}</h3>
            <h3>{clickedUser.freeText}</h3>
            <Link to={`/users/${clickedUser.username}`}>Read More</Link>
          </div>
        </div>
      }
      
    </div>
  </div>


};

export default withRouter(Map);


//==========helper functions==============


async function placeUsersOnMap(filteredUsers, addInfoBubble, map) {
  for (const user of filteredUsers) {
    // const response = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${user.city}, ${user.postalCode}`)
    // const coords = { lat: response.data.data[0].latitude, lng: response.data.data[0].longitude }
    const coords = { lat: user.geoLocation.latitude, lng: user.geoLocation.longitude }
    addInfoBubble(map, coords, user);
  }
}

function addMarkerToGroup(group, coordinate, html, H) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

function renderMap(mapRef, location, filteredUsers, setClickedUser, users, setShowUserList, setShowUserCard) {
  const H = window.H;
  const platform = new H.service.Platform({
    apikey: "4hZBBO5HOy_b0h_4xBfFNHrcIQEurBqR58bhr3nIgCs"
  });
  const defaultLayers = platform.createDefaultLayers();
  const service = platform.getSearchService();

  //empty the map in the beginning of each render
  mapRef.current.innerHTML = '';

  // `mapRef.current` will be `undefined` when this hook first runs; edge case that
  if (!mapRef.current) return;

  //define the map

  const map = new H.Map(
    mapRef.current,
    defaultLayers.vector.normal.map,
    {
      zoom: 4,
      center: { lat: 64.9146659, lng: 26.0672554 },
      pixelRatio: window.devicePixelRatio || 1
    });

  //start geocoding
  service.geocode({ q: location }, async (result) => {

    //loop over users and mark them on the map  
    placeUsersOnMap(filteredUsers, addInfoBubble, map);

    function addInfoBubble(map, coords, user) {
      var group = new H.map.Group();
      map.addObject(group);
      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        const clickedUser = evt.target.getData();
        setClickedUser(users.find(user => user.username === evt.target.getData()));
        setShowUserList(false);
        setShowUserCard(true)
      }, false);

      addMarkerToGroup(group, coords, `${user.username}`, H
      );
    }

    window.addEventListener('resize', () => map.getViewPort().resize());

    //enables pan/zooming
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  })
}