import React, { useEffect, useState } from 'react';
import styles from './Map.module.scss';

const Map = ({address}) => {
  const [location, setLocation] = useState(address);
  
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
  useEffect(() => {

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
    service.geocode({ q: location || address }, result => {
      if(result.items.length === 0) return;
      var pinIcon = new H.map.Icon("https://www.flaticon.com/svg/static/icons/svg/484/484167.svg", { size: { w: 32, h: 32 } }),
        coords = { lat: result.items[0].position.lat, lng: result.items[0].position.lng },
        marker = new H.map.Marker(coords, { icon: pinIcon });

      // Render map with provided coordinates in the center
      var map = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 12,
          center: coords,
          pixelRatio: window.devicePixelRatio || 1
        });

      //add marker to map
      map.addObject(marker);

      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      // This variable is unused and is present for explanatory purposes
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI components to allow the user to interact with them
      // This variable is unused
      const ui = H.ui.UI.createDefault(map, defaultLayers);
    })
  }, [location, address]); // This will run this hook every time the location i updated

  return <div className={styles.mapContainer}>
    <div id="map" ref={mapRef} style={{ height: "300px", width: "300px" }} />
    <form id="map-form" onSubmit={submitHandler}>
    <div className="input-group-map">
      <input class="map-input" type="text" id="userInput" placeholder={address}></input>
      <button class="map-btn" type="submit">Search</button>
    </div>
    </form>
  </div>;
};

export default Map;