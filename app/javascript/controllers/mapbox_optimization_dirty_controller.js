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
    console.log(this.coordsValue)
    let testCoords = [[-0.0394004, 51.6673125],
      [-0.0394004, 51.6673125],
      [0.008032527616080642, 51.5318385307792],
      [-0.13161205881021942, 51.59522623673902],
      [-0.14587838530709973, 51.501766527707616],
      [-0.21878659646091592, 51.51183314085651]
    ]
    testCoords = this.coordsValue
    let centerMap = 0;



    mapboxgl.accessToken = this.apiKeyValue

    if ( testCoords.length <= 0) {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-0.11878659646091592, 51.51183314085651], // starting position
        zoom: 12
      })
    }
    else {
    const self = this
    const truckLocation = testCoords[0]//[-0.0496004, 51.6693125];
    const warehouseLocation = [-0.0498004, 51.7693125];
    const lastAtRestaurant = 0;
    let keepTrack = [];
    const pointHopper = {};
    // Create a GeoJSON feature collection for the warehouse
    const warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // Create an empty GeoJSON feature collection for drop-off locations
    const dropoffs = turf.featureCollection([]);
    // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
    const nothing = turf.featureCollection([]);

    // mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: truckLocation, // starting position
      zoom: 12
    })

    this.#addMarkersToMap()
    // this.#fitMapToMarkers()
    // this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl }))


    this.map.on('load', async () => {
      const marker = document.createElement('div');
      marker.classList = 'truck';
      new mapboxgl.Marker(marker).setLngLat(truckLocation).addTo(this.map);

      // Create a circle layer
      // Create a circle layer
      // this.map.addLayer({
      //   id: 'warehouse',
      //   type: 'circle',
      //   source: {
      //     data: warehouse,
      //     type: 'geojson'
      //   },
      //   paint: {
      //     'circle-radius': 20,
      //     'circle-color': 'white',
      //     'circle-stroke-color': '#3887be',
      //     'circle-stroke-width': 3
      //   }
      // });

      // Create a symbol layer on top of circle layer
      // this.map.addLayer({
      //   id: 'warehouse-symbol',
      //   type: 'symbol',
      //   source: {
      //     data: warehouse,
      //     type: 'geojson'
      //   },
      //   layout: {
      //     'icon-image': 'grocery-15',
      //     'icon-size': 1
      //   },
      //     paint: {
      //     'text-color': '#3887be'
      //   }
      // });

      this.map.addLayer({
        id: 'dropoffs-symbol',
        type: 'symbol',
        source: {
          data: dropoffs,
          type: 'geojson'
        },
        layout: {
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': 'marker-15'
        }
      });

      this.map.addSource('route', {
        type: 'geojson',
        data: nothing
      });

      this.map.addLayer(
        {
          id: 'routeline-active',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12]
          }
        },
        'waterway-label'
      );

      this.map.addLayer(
        {
          id: 'routearrows',
          type: 'symbol',
          source: 'route',
          layout: {
            'symbol-placement': 'line',
            'text-field': '▶',
            'text-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              24,
              22,
              60
            ],
            'symbol-spacing': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              30,
              22,
              160
            ],
            'text-keep-upright': false
          },
          paint: {
            'text-color': '#3887be',
            'text-halo-color': 'hsl(55, 11%, 96%)',
            'text-halo-width': 3
          }
        },
        'waterway-label'
      );


      testCoords.forEach(element => {
        let coords = {
          lng: element[0],
          lat: element[1]
        }
        this.map.on('load', addWaypoints(coords))
      });



      function addWaypoints(coords) {
        newDropoff(coords);
        updateDropoffs(dropoffs);
      }

      // this.map.on('load', addWaypoints())

      // Listen for a click on the map
      // await this.map.on('click', addWaypoints);
    });

    // async function addWaypoints(event) {
    //   // When the map is clicked, add a new drop off point
    //   // and update the `dropoffs-symbol` layer
    //   await newDropoff(self.map.unproject(event.point));
      // updateDropoffs(dropoffs);
    // }


    async function newDropoff(coordinates) {
      // Store the clicked point as a new GeoJSON feature with
      // two properties: `orderTime` and `key`
      const pt = turf.point([coordinates.lng, coordinates.lat], {
        orderTime: Date.now(),
        key: Math.random()
      });

      dropoffs.features.push(pt);
      pointHopper[pt.properties.key] = pt;
      // Make a request to the Optimization API
      const query = await fetch(assembleQueryURL(), { method: 'GET' });
      const response = await query.json();

      // Create an alert for any requests that return an error
      if (response.code !== 'Ok') {
        const handleMessage =
          response.code === 'InvalidInput'
            ? 'Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors'
            : 'Try a different point.';
        alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
        // Remove invalid point
        dropoffs.features.pop();
        delete pointHopper[pt.properties.key];
        return;
      }
      // Create a GeoJSON feature collection
      const routeGeoJSON = turf.featureCollection([
        turf.feature(response.trips[0].geometry)
      ]);
      // Update the `route` source by getting the route source
      // and setting the data equal to routeGeoJSON
      self.map.getSource('route').setData(routeGeoJSON);
    }

    function updateDropoffs(geojson) {
      self.map.getSource('dropoffs-symbol').setData(geojson);
    }

    // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
    function assembleQueryURL() {
      // Store the location of the truck in a constant called coordinates
      const coordinates = [truckLocation];
      const distributions = [];
      // let restaurantIndex;
      keepTrack = [truckLocation];

      // Create an array of GeoJSON feature collections for each point
      const restJobs = Object.keys(pointHopper).map((key) => pointHopper[key]);
      console.log(restJobs)
      // If there are any orders from this restaurant
      if (restJobs.length > 0) {
        // Check to see if the request was made after visiting the restaurant
        // const needToPickUp =
        //   restJobs.filter((d) => {
        //     return d.properties.orderTime > lastAtRestaurant;
        //   }).length > 0;

        // If the request was made after picking up from the restaurant,
        // Add the restaurant as an additional stop
        // if (needToPickUp) {
        //   restaurantIndex = coordinates.length;
        //   // Add the restaurant as a coordinate
        //   coordinates.push(warehouseLocation);
        //   // push the restaurant itself into the array
        //   keepTrack.push(pointHopper.warehouse);
        // }

        for (const job of restJobs) {
          // Add dropoff to list
          keepTrack.push(job);
          coordinates.push(job.geometry.coordinates);
          // if order not yet picked up, add a reroute
          // if (needToPickUp && job.properties.orderTime > lastAtRestaurant) {
          //   distributions.push(`${restaurantIndex},${coordinates.length - 1}`);
          // }
        }
      }

      // Set the profile to `driving`
      // Coordinates will include the current location of the truck,
      return `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinates.join(
        ';'
      )}?distributions=${distributions.join(
        ';'
      )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
        mapboxgl.accessToken
      }`;
    }

  }

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
