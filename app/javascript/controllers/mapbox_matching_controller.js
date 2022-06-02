import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    coords: Array
  }
  connect() {
    mapboxgl.accessToken = this.apiKeyValue
    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.42136449,37.80176523], // Specify the starting position
      zoom: 14.5, // Specify the starting zoom
    })
    let self = this;

    console.log(this.coordsValue)

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))
    this.map.addControl(draw);


    // Use the coordinates you drew to make the Map Matching API request
    function updateRoute() {
      // Set the profile
      const profile = 'driving';
      // Get the coordinates that were drawn on the map
      const data = draw.getAll();
      const lastFeature = data.features.length - 1;
      const coords = data.features[lastFeature].geometry.coordinates;
      // const coords = [[-0.05576253522718844, 51.652186545514525], [-0.05913813630189679, 51.64892857133077], [-0.07001507309706767, 51.644739403304385]]
      console.log(coords)
      console.log(self.coordsValue)
      // Format the coordinates
      const newCoords = coords.join(';');
      console.log(newCoords)
      // Set the radius for each coordinate pair to 25 meters
      const radius = coords.map(() => 25);
      console.log(radius)

      async function getMatch(coordinates, radius, profile) {
        // Separate the radiuses with semicolons
        const radiuses = radius.join(';');
        // Create the query
        const query = await fetch(
          `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
          { method: 'GET' }
        );
        const response = await query.json();
        // Handle errors
        if (response.code !== 'Ok') {
          alert(
            `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
          );
          return;
        }
        // Get the coordinates from the response
        const coords = response.matchings[0].geometry;
        // Draw the route on the map
        // addRoute(coords);


        // Draw the Map Matching route as a new layer on the map
        function addRoute(coords) {
          // If a route is already loaded, remove it
          if (self.map.getSource('route')) {
            self.map.removeLayer('route');
            self.map.removeSource('route');
          } else {
            // Add a new layer to the map
            self.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: coords
                }
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#03AA46',
                'line-width': 8,
                'line-opacity': 0.8
              }
            });
          }
        }

        function getInstructions(data) {
          // Target the sidebar to add the instructions
          const directions = document.getElementById('directions');
          let tripDirections = '';
          // Output the instructions for each step of each leg in the response object
          for (const leg of data.legs) {
            const steps = leg.steps;
            for (const step of steps) {
              tripDirections += `<li>${step.maneuver.instruction}</li>`;
            }
          }
          directions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
            data.duration / 60
          )} min.</strong></p><ol>${tripDirections}</ol>`;
        }

        addRoute(coords);
        getInstructions(response.matchings[0]);
      }

      getMatch(newCoords, radius, profile);
    }


    // If the user clicks the delete draw button, remove the layer if it exists
    function removeRoute() {
      if (!self.map.getSource('route')) return;
      self.map.removeLayer('route');
      self.map.removeSource('route');
    }

    this.map.on('draw.create', updateRoute);
    this.map.on('draw.update', updateRoute);
    this.map.on('draw.delete', removeRoute);
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window)

      // Create an HTML element for your custom marker
      const customMarker = document.createElement("div")
      customMarker.className = "marker"
      customMarker.style.backgroundImage = `url('${marker.image_url}')`
      customMarker.style.backgroundSize = "contain"
      customMarker.style.width = "25px"
      customMarker.style.height = "25px"

      // Pass the element as an argument to the new marker
      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}

const draw = new MapboxDraw({
  // Instead of showing all the draw tools, show only the line string and delete tools.
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true
  },
  // Set the draw mode to draw LineStrings by default.
  defaultMode: 'draw_line_string',
  styles: [
    // Set the line style for the user-input coordinates.
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#438EE4',
        'line-dasharray': [0.2, 2],
        'line-width': 4,
        'line-opacity': 0.7
      }
    },
    // Style the vertex point halos.
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 12,
        'circle-color': '#FFF'
      }
    },
    // Style the vertex points.
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 8,
        'circle-color': '#438EE4'
      }
    }
  ]
});
