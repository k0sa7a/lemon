import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
  };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    // if (this.markersValue.length == 0) {
    //   this.map = new mapboxgl.Map({
    //     container: this.element,
    //     style: "mapbox://styles/piresgabrielgit/cl3q0obfl000j15lfzbp762gg",
    //     center: [-0.11878659646091592, 51.51183314085651], // starting position
    //     zoom: 12
    //   })
    // } else {

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/piresgabrielgit/cl3q0obfl000j15lfzbp762gg",
    });

    this.#addMarkersToMap();
    this.#fitMapToMarkers();

    this.#rerender();
    // }
    // this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
    // mapboxgl: mapboxgl }))

    // this.map.on("load", () => {
    //   console.log(this.map);
    //   this.map.resize();
    // });
  }

  //to stop the squashed map issue - https://stackoverflow.com/questions/57166761/mapbox-gl-height-100
  #rerender() {
    this.map.on("render", async () => {
      this.map.resize();
      console.log(this.map);
    });
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window);

      // Create an HTML element for your custom marker
      const customMarker = document.createElement("div");
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

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markersValue.forEach((marker) =>
      bounds.extend([marker.lng, marker.lat])
    );
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }
}
