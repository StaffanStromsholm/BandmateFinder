async function placeUsersOnMap(filteredUsers, addInfoBubble, map) {
    for (const user of filteredUsers) {
        const coords = {
            lat: user.geoLocation.latitude,
            lng: user.geoLocation.longitude,
        };
        addInfoBubble(map, coords, user);
    }
}

function addMarkerToGroup(group, coordinate, html, H) {
    var marker = new H.map.Marker(coordinate);
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
}

function renderMap(
    mapRef,
    location,
    filteredUsers,
    setClickedUser,
    users,
    setShowUserList,
    setShowUserCard
) {
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "4hZBBO5HOy_b0h_4xBfFNHrcIQEurBqR58bhr3nIgCs",
    });
    const defaultLayers = platform.createDefaultLayers();
    const service = platform.getSearchService();

    //empty the map in the beginning of each render
    mapRef.current.innerHTML = "";

    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    //define the map
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: 4,
        center: { lat: 64.9146659, lng: 26.0672554 },
        pixelRatio: window.devicePixelRatio || 1,
    });

    //start geocoding
    service.geocode({ q: location }, async (result) => {
        //loop over users and mark them on the map
        placeUsersOnMap(filteredUsers, addInfoBubble, map);

        function addInfoBubble(map, coords, user) {
            var group = new H.map.Group();
            map.addObject(group);
            // add 'tap' event listener, that opens info bubble, to the group
            group.addEventListener(
                "tap",
                function (evt) {
                    const clickedUser = evt.target.getData();
                    setClickedUser(
                        users.find(
                            (user) => user.username === evt.target.getData()
                        )
                    );
                    setShowUserList(false);
                    setShowUserCard(true);
                },
                false
            );

            addMarkerToGroup(group, coords, `${user.username}`, H);
        }

        window.addEventListener("resize", () => map.getViewPort().resize());

        //enables pan/zooming
        const behavior = new H.mapevents.Behavior(
            new H.mapevents.MapEvents(map)
        );
        const ui = H.ui.UI.createDefault(map, defaultLayers);
    });
}

export { placeUsersOnMap, addMarkerToGroup, renderMap }