import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs"

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
  connect(){
    console.log(this.linkTarget.href)
  }

  update(e) {

    e.preventDefault();
    e.stopPropagation();
    let url = this.linkTarget.href
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'X-CSRF-Token': csrfToken()
    }
    fetch(url, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(this.itemTarget)
    })
    // .then(response => response)
    // .then(() => console.log(this.itemTarget))
    .then(() => this.itemTarget.remove())
    .then(() => this.cleanupMarkers())
    .then(() => this.setCoords())
    .then(() => this.mapController.reload())
    .catch(err => console.log(err))


    // .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    // .catch(err => console.log(err))



    // console.log(this.mapController)
    // this.mapController.reload();
  }

  setCoords() {
    let map = document.getElementById('itinerary-map');
    let items = [];
    document.querySelectorAll('.itinerary-list-item').forEach(element => {
      items.push(element.dataset.editListItemsValue)
    });
    map.dataset.mapboxOptimizationCoordsValue = `[${items}]`
    // console.log(items)
    // console.log(map.dataset.mapboxOptimizationCoordsValue)
  }

  cleanupMarkers() {
    let deleted = this.itemTarget.dataset.editListItemsValue
    document.querySelectorAll('.marker').forEach(element => {
      if (element.id == deleted) {
        element.remove()
      }
    });
    document.querySelector('.truck').remove()
  }

  get mapController() {
    let map = document.getElementById('itinerary-map');
    return this.application.getControllerForElementAndIdentifier(map, 'mapbox-optimization');
  }

}
