import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    const self = this
    const truckLocation = [-83.093, 42.376];
    const warehouseLocation = [-83.083, 42.363];
    const lastAtRestaurant = 0;
    const keepTrack = [];
    const pointHopper = {};
    // Create a GeoJSON feature collection for the warehouse
    const warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // Create an empty GeoJSON feature collection for drop-off locations
    const dropoffs = turf.featureCollection([]);
    // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
    const nothing = turf.featureCollection([]);

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: truckLocation, // starting position
      zoom: 12
    })

    this.#addMarkersToMap()
    // this.#fitMapToMarkers()
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))


    this.map.on('load', async () => {
      const marker = document.createElement('div');
      marker.classList = 'truck';
      new mapboxgl.Marker(marker).setLngLat(truckLocation).addTo(this.map);

      this.map.addLayer({
        id: 'warehouse',
        type: 'circle',
        source: {
          data: warehouse,
          type: 'geojson'
        },
        paint: {
          'circle-radius': 20,
          'circle-color': 'white',
          'circle-stroke-color': '#3887be',
          'circle-stroke-width': 3
        }
      });

      // Create a symbol layer on top of circle layer
      this.map.addLayer({
        id: 'warehouse-symbol',
        type: 'symbol',
        source: {
          data: warehouse,
          type: 'geojson'
        },
        layout: {
          'icon-image': 'grocery-15',
          'icon-size': 1
        },
        paint: {
          'text-color': '#3887be'
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



      async function addWaypoints(event) {
        // When the map is clicked, add a new drop off point
        // and update the `dropoffs-symbol` layer
        await newDropoff(self.map.unproject(event.point));
        updateDropoffs(dropoffs);
      }

      async function newDropoff(coordinates) {
        // Store the clicked point as a new GeoJSON feature with
        // two properties: `orderTime` and `key`
        const pt = turf.point([coordinates.lng, coordinates.lat], {
          orderTime: Date.now(),
          key: Math.random()
        });
        dropoffs.features.push(pt);
      }

      function updateDropoffs(geojson) {
        self.map.getSource('dropoffs-symbol').setData(geojson);
      }











      // Listen for a click on the map
      await this.map.on('click', addWaypoints);
    });



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
