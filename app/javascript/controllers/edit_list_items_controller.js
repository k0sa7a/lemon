import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["link", "item"];


  // connect() {
  //   let map = document.getElementById('itinerary-map');
  //   // console.log(map.dataset.mapboxOptimizationCoordsValue)
  //   let items = [];
  //   document.querySelectorAll('.itinerary-list-item').forEach(element => {
  //     items.push(element.dataset.editListItemsValue)
  //   });
  //   console.log(map.setAttribute('data-mapbox-optimization-coords-value', `[${items}]` ))
  // }

  update() {
    setTimeout(()=> {this.setCoords()}, 500);

    // console.log(this.mapController)
    // this.mapController.reload();
    setTimeout(()=> {this.mapController.reload()}, 500);
  }

  setCoords() {
    let map = document.getElementById('itinerary-map');
    let items = [];
    document.querySelectorAll('.itinerary-list-item').forEach(element => {
      items.push(element.dataset.editListItemsValue)
    });
    map.dataset.mapboxOptimizationCoordsValue = `[${items}]`
    console.log(items)
    console.log(map.dataset.mapboxOptimizationCoordsValue)
  }

  get mapController() {
    let map = document.getElementById('itinerary-map');
    return this.application.getControllerForElementAndIdentifier(map, 'mapbox-optimization');
  }

}
