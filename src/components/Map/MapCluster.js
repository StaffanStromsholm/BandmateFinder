import React, { useLayoutEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './styles.css';
import electricGuitar from '../../instrumentIcons/electric-guitar.png';
import piano from '../../instrumentIcons/piano.png';
import drums from '../../instrumentIcons/drumset.png'
import bassGuitar from '../../instrumentIcons/bass-guitar.png';
import trumpet from '../../instrumentIcons/trumpet.png';
import violin from '../../instrumentIcons/violin.png';
import harmonica from '../../instrumentIcons/harmonica.png';
import saxophone from '../../instrumentIcons/saxophone.png';
import trombone from '../../instrumentIcons/trombone.png';
import percussion from '../../instrumentIcons/percussion.png';
import acousticGuitar from '../../instrumentIcons/acoustic-guitar.png';
import contrabass from '../../instrumentIcons/contrabass.png';
import flute from '../../instrumentIcons/flute.png';
import cello from '../../instrumentIcons/cello.png';
import accordion from '../../instrumentIcons/accordion.png';
import './styles.css';

import axios from 'axios';

const instruments = {
  'Electric-guitar': electricGuitar,
  'Piano': piano,
  'Drums': drums,
  'Bass': bassGuitar,
  'Trumpet': trumpet,
  'Violin': violin,
  'Harmonica': harmonica,
  'Saxophone': saxophone,
  'Trombone': trombone,
  'Percussion': percussion,
  'Acoustic-guitar': acousticGuitar,
  'Contrabass': contrabass,
  'Flute': flute,
  'Cello': cello,
  'Accordion': accordion
};

const pinImg = 'https://www.flaticon.com/svg/static/icons/svg/484/484167.svg';


const positionStackAPIKey = 'be2bf278ff4827f8917f1e0ac5f177f9';

const Map = ({ users }) => {
  const [location, setLocation] = useState('Helsinki');
  const [locations, setLocations] = useState([]);
  const [arrayOfUserCoords, setArrayOfUserCoords] = useState([]);

  const getCoords = (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const coords = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${user.city}, ${user.postalCode}`)
        if (coords.data.data[0].latitude) {
          const data = { latitude: coords.data.data[0].latitude, longitude: coords.data.data[0].latitude, user }
          resolve(data);
        } else {
          reject("Well that didn't go as planned");
        }
      }
      catch (err) {
        reject(err);
      }
    })
  }

 // Create a reference to the HTML element we want to put the map on
 const mapRef = React.useRef(null);
 
  useLayoutEffect(() => {
    
    //empty the map in the beginning of each render
    document.getElementById('map').innerHTML = '';

    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "4hZBBO5HOy_b0h_4xBfFNHrcIQEurBqR58bhr3nIgCs"
    });
    const defaultLayers = platform.createDefaultLayers();
    var service = platform.getSearchService();

    service.geocode({ q: location }, async (result) => {
      const map = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 4,
          center: { lat: 64.9146659, lng: 26.0672554 },
          pixelRatio: window.devicePixelRatio || 1
        });
        
    //loop over users and mark them on the map  
      for (const user of users) {
        const response = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${user.city}, ${user.postalCode}`)
        const coords = { lat: response.data.data[0].latitude, lng: response.data.data[0].longitude }
        const marker = new H.map.Marker(coords, { icon: new H.map.Icon((instruments[user.primaryInstrument] || pinImg), { size: { w: 22, h: 22 } }) });
        map.addObject(marker);
        addInfoBubble(map, coords, user);
      }

      function addMarkerToGroup(group, coordinate, html) {
        var marker = new H.map.Marker(coordinate);
        // add custom data to the marker
        marker.setData(html);
        group.addObject(marker);
      }

      function addInfoBubble(map, coords, user) {
        var group = new H.map.Group();
      
        map.addObject(group);
      
        // add 'tap' event listener, that opens info bubble, to the group
        group.addEventListener('tap', function (evt) {
          console.log(evt.target.getData())
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData()
          });
          console.log(bubble);
          // show info bubble
          ui.addBubble(bubble);
        }, false);
      
        addMarkerToGroup(group, coords, `<a href="/users/${user.username}">${user.username}</a>`
          );
      }

      window.addEventListener('resize', () => map.getViewPort().resize());


      //enables pan/zooming
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);

    })
  }, []); // This will run this hook every time the locations i updated

  return <div className="Map">
    <div id="map" ref={mapRef} style={{ height: "400px", width: "400px"}} />
  </div>;
};

export default withRouter(Map);
