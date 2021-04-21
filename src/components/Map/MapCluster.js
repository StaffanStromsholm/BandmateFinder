import React, { useLayoutEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './Map.module.scss';
import FilterByInstrument from './filterByInstrument';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {instruments} from '../../config';

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

  const classes = useStyles();
  const stringCharNr = 20

  const setFilterByInstrumentHandler = (instrument) => {

    if(instrument === 'All'){
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.primaryInstrument === instrument));
      setFilterByInstrument(instrument);
    }
  }

  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  useLayoutEffect(() => {

    renderMap(mapRef, location, filteredUsers, setClickedUser, users);

  }, [filteredUsers]);

  return <div className={styles.mapContainer}>

        <FilterByInstrument setFilterByInstrument={setFilterByInstrumentHandler} />

          <div id="map" ref={mapRef} style={{ height: "40vh" }} />

        {!clickedUser && <h4>Select a user</h4>}

        {clickedUser &&
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {clickedUser.username} <img src={instruments[clickedUser.primaryInstrument]} style={{width: "60px", float: "right"}} />
              </Typography>
              
              <Typography variant="body2" color="textSecondary" component="p">
                
                {(clickedUser.freeText.length <= stringCharNr) &&
                  clickedUser.freeText}
                
                {(clickedUser.freeText.length > stringCharNr) &&
                  clickedUser.freeText.substring(0, stringCharNr) + '...'}

              </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/users/${clickedUser.username}`}>Read More</Link>
          </Button>
        </CardActions>
      </Card>
    }

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

function renderMap(mapRef, location, filteredUsers, setClickedUser, users){
  const H = window.H;
    const platform = new H.service.Platform({
      apikey: "4hZBBO5HOy_b0h_4xBfFNHrcIQEurBqR58bhr3nIgCs"
    });
    const defaultLayers = platform.createDefaultLayers();
    const service = platform.getSearchService();

    //empty the map in the beginning of each render
    document.getElementById('map').innerHTML = '';

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