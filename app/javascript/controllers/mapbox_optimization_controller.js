import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    coords: Array,
    start: Array,
  };

  connect() {
    // console.log(this.startValue)
    // console.log(this.coordsValue[0])

    mapboxgl.accessToken = this.apiKeyValue;

    if (this.coordsValue.length <= 0) {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-0.11878659646091592, 51.51183314085651], // starting position
        zoom: 12,
      });
    } else {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/streets-v11",
      });

      this.#addMarkersToMap();
      this.#fitMapToMarkers();
    }

    this.#routing();
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window);

      // Create an HTML element for your custom marker
      const customMarker = document.createElement("div");
      customMarker.id = `[${marker.lng}, ${marker.lat}]`;
      customMarker.className = "marker";
      customMarker.style.backgroundImage = `url('${marker.image_url}')`;
      customMarker.style.backgroundSize = "contain";
      customMarker.style.width = "25px";
      customMarker.style.height = "25px";

      // Pass the element as an argument to the new marker
      new mapboxgl.Marker(customMarker)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  #routing() {
    mapboxgl.accessToken = this.apiKeyValue;

    // const self = this
    this.truckLocation = this.startValue;
    this.keepTrack = [];
    this.pointHopper = {};
    // Create an empty GeoJSON feature collection for drop-off locations
    this.dropoffs = turf.featureCollection([]);
    // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
    this.nothing = turf.featureCollection([]);

    this.map.on("load", async () => {
      const marker = document.createElement("div");
      marker.classList = "truck";
      new mapboxgl.Marker(marker).setLngLat(this.truckLocation).addTo(this.map);

      this.genLayers();

      this.addWaypoints(this.coordsValue);
    });
  }

  genLayers() {
    this.map.addLayer({
      id: "dropoffs-symbol",
      type: "symbol",
      source: {
        data: this.dropoffs,
        type: "geojson",
      },
      layout: {
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-image": "marker-15",
      },
    });

    this.map.addSource("route", {
      type: "geojson",
      data: this.nothing,
    });

    this.map.addLayer(
      {
        id: "routeline-active",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12],
        },
      },
      "waterway-label"
    );

    this.map.addLayer(
      {
        id: "routearrows",
        type: "symbol",
        source: "route",
        layout: {
          "symbol-placement": "line",
          "text-field": "▶",
          "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            30,
            22,
            160,
          ],
          "text-keep-upright": false,
        },
        paint: {
          "text-color": "#3887be",
          "text-halo-color": "hsl(55, 11%, 96%)",
          "text-halo-width": 3,
        },
      },
      "waterway-label"
    );
  }

  addWaypoints(coords) {
    let formattedCoords = coords.map((element) => {
      let coord = {
        lng: element[0],
        lat: element[1],
      };
      return coord;
    });
    this.createPoints(formattedCoords);
    this.updateDropoffs(this.dropoffs);
  }

  updateDropoffs(geojson) {
    this.map.getSource("dropoffs-symbol").setData(geojson);
  }

  async createPoints(coordinates) {
    coordinates.forEach((coord) => {
      const pt = turf.point([coord.lng, coord.lat], {
        orderTime: Date.now(),
        key: Math.random(),
      });
      this.dropoffs.features.push(pt);
      this.pointHopper[pt.properties.key] = pt;
    });
    const query = await fetch(this.assembleQueryURL(), { method: "GET" });
    const response = await query.json();

    this.steps(response.trips[0].legs);

    // Create an alert for any requests that return an error
    if (response.code !== "Ok") {
      const handleMessage =
        response.code === "InvalidInput"
          ? "Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors"
          : "Try a different point.";
      alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
      // Remove invalid point
      // dropoffs.features.pop();
      // delete pointHopper[pt.properties.key];
      return;
    }

    // Create a GeoJSON feature collection
    const routeGeoJSON = turf.featureCollection([
      turf.feature(response.trips[0].geometry),
    ]);
    // Update the `route` source by getting the route source
    // and setting the data equal to routeGeoJSON
    this.map.getSource("route").setData(routeGeoJSON);
  }

  assembleQueryURL() {
    // Store the location of the truck in a constant called coordinates
    const coordinates = [this.truckLocation];
    const distributions = [];
    // let restaurantIndex;
    this.keepTrack = [this.truckLocation];

    // Create an array of GeoJSON feature collections for each point
    const restJobs = Object.keys(this.pointHopper).map(
      (key) => this.pointHopper[key]
    );
    // If there are any orders from this restaurant
    if (restJobs.length > 0) {
      for (const job of restJobs) {
        // Add dropoff to list
        this.keepTrack.push(job);
        coordinates.push(job.geometry.coordinates);
      }
    }

    // Set the profile to `driving`
    // Coordinates will include the current location of the truck,
    return `https://api.mapbox.com/optimized-trips/v1/mapbox/cycling/${coordinates.join(
      ";"
    )}?distributions=${distributions.join(
      ";"
    )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
      mapboxgl.accessToken
    }`;
  }

  async steps(legs) {
    const instructions = document.getElementById("instructions");
    let duration = 0;
    let tripInstructions = "";
    for (const leg of legs) {
      duration += leg.duration;
      for (const step of leg.steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      duration / 60
    )} min 🛼 </strong></p><ol>${tripInstructions}</ol>`;
  }

  rerouting() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.truckLocation = this.startValue;
    this.keepTrack = [];
    this.pointHopper = {};
    // Create an empty GeoJSON feature collection for drop-off locations
    this.dropoffs = turf.featureCollection([]);
    // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
    this.nothing = turf.featureCollection([]);

    const marker = document.createElement("div");
    marker.classList = "truck";
    new mapboxgl.Marker(marker).setLngLat(this.truckLocation).addTo(this.map);

    this.addWaypoints(this.coordsValue);
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markersValue.forEach((marker) =>
      bounds.extend([marker.lng, marker.lat])
    );
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }

  #mapCenter() {
    let latTotal = 0;
    let longTotal = 0;
    let sum = 0;
    this.coordsValue.forEach((element) => {
      longTotal += element[0];
      latTotal += element[1];
      sum++;
    });
    return [longTotal / sum, latTotal / sum];
  }

  reload() {
    this.rerouting();
  }
}
