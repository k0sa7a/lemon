import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = ["link", "item"];

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
    //WIP
    // .finally(() => {
    //   if (document.querySelectorAll('.itinerary-list-item').length == 0) {
    //     console.log('empty')
    //     window.location.reload();
    //   }
    // })
  }

  setCoords() {
    let map = document.getElementById('itinerary-map');
    let items = [];
    document.querySelectorAll('.itinerary-list-item').forEach(element => {
      items.push(element.dataset.editListItemsValue)
    });
    map.dataset.mapboxOptimizationCoordsValue = `[${items}]`
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
