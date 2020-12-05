/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXJpYW5mYWxsYWgiLCJhIjoiY2tneWQya3cwMDFzNjJ0bWpmbzRkbjB1YiJ9.gcpjPb9mYTriYLrzSZsjCw";

  var map = new mapboxgl.Map({
    container: "map", // puts a map on the element with and id of 'map'
    style: "mapbox://styles/arianfallah/ckgydywb17ybn19mayvb4bwty",
    scrollZoom: false,
    //   center: [-118.107578, 34.100834],
    //   zoom: 4,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker"; // This makes a pin that is custom made by us, NOT from mapbox

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom", // bottom of pin is the exact gps location
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popu
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
