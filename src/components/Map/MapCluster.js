import React, { useEffect, useState } from 'react';
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

import axios from 'axios';

const instruments = {
                        'Electric-guitar': electricGuitar,
                        'Piano': piano,
                        'Drum-set': drums,
                        'Bass-guitar': bassGuitar,
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

const Map = ({users}) => {
  const [location, setLocation] = useState('Helsinki');
  const [arrayOfUserCoords, setArrayOfUserCoords] = useState([]);
  
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  const submitHandler = (e) => {
    const userInput = document.getElementById('userInput').value;
    e.preventDefault();
    //return if user input is empty
    if(!userInput) return;
    setLocation(userInput);
  }

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useEffect(async() => {

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

    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    service.geocode({ q: location }, async(result) => {
      if(result.items.length === 0) return;
      var pinIcon = new H.map.Icon('https://www.flaticon.com/svg/static/icons/svg/484/484167.svg', { size: { w: 32, h: 32 } }),
        coords = { lat: result.items[0].position.lat, lng: result.items[0].position.lng },
        marker = new H.map.Marker(coords, { icon: pinIcon });
        // const marker2 = new H.map.Marker({lat: 53.17116, lng: 20.93265}, {icon: pinIcon})

      // Render map with provided coordinates in the center
      var map = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 4,
          center: {lat: 64.9146659, lng: 26.0672554},
          pixelRatio: window.devicePixelRatio || 1
        });

        const userCoords = await Promise.all(users.map(async(user) => {
            console.log(user.primaryInstrument);
            const coords = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${user.city}, ${user.postalCode}`)
            const data = {latitude: coords.data.data[0].latitude, longitude: coords.data.data[0].longitude, instrument: user.primaryInstrument};
            return data;
        }))
        
        const userCoordsArray = await userCoords;

        userCoordsArray.forEach(userCoords => {
            const coords = { lat: userCoords.latitude, lng: userCoords.longitude }
            marker = new H.map.Marker(coords, { icon:  new H.map.Icon((instruments[userCoords.instrument] || pinImg), { size: { w: 32, h: 32 } })});
            map.addObject(marker);
        })


      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      // This variable is unused and is present for explanatory purposes
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI components to allow the user to interact with them
      // This variable is unused
      const ui = H.ui.UI.createDefault(map, defaultLayers);
    })
  }, []); // This will run this hook every time the location i updated

  return <div className="Map">
    <div id="map" ref={mapRef} style={{ height: "300px", width: "300px" }} />
  </div>;
};

export default Map;
