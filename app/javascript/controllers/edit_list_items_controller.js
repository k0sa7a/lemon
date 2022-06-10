import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = ["link", "item", "form"];
  static values = {
    coords: Array,
  }


  update(e) {

    e.preventDefault();
    e.stopPropagation();
    if (this.itemTarget.classList.value.includes('itinerary_table__start-point')) {
      this.itineraryShowController.InitialStartCoords();
    }

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
    .then(() => {this.itineraryShowController.setStartCoords()})
    .catch(err => console.log(err))
    //WIP
    // .finally(() => {
    //   if (document.querySelectorAll('.itinerary-list-item').length == 0) {
    //     console.log('empty')
    //     window.location.reload();
    //   }
    // })


    this.dispatch("update", { detail: { content: this.itemTarget } })
  }

  setCoords() {
    let map = document.getElementById('itinerary-map');
    let items = [];
    document.querySelectorAll('.itinerary-list-item').forEach(element => {
      items.push(element.dataset.editListItemsCoordsValue)
    });
    map.dataset.mapboxOptimizationCoordsValue = `[${items}]`
  }

  cleanupMarkers() {
    let deleted = this.itemTarget.dataset.editListItemsCoordsValue
    document.querySelectorAll('.marker').forEach(element => {
      if (element.id == deleted) {
        element.remove()
      }
    });
    document.querySelector('.truck').remove()
  }

  setStart(event) {
    event.preventDefault()
    this.itineraryShowController.removeStart()
    const url = this.formTarget.action
    fetch(url, {
        method: "PATCH",
        headers: { "Accept": "text/plain" },
        body: new FormData(this.formTarget)
      })
        .then(response => response.text())
        .then((data) => {this.itemTarget.outerHTML = data})
        .then(() => {this.itineraryShowController.setStartCoords()})
        .then(() => {document.querySelector('.truck').remove()})
        .then(() => this.mapController.reload())
        .catch(err => console.log(err))
  }

  get mapController() {
    let map = document.getElementById('itinerary-map');
    return this.application.getControllerForElementAndIdentifier(map, 'mapbox-optimization');
  }

  get itineraryShowController() {
    let itineraryCont = document.getElementById('itinerary-show-cont');
    return this.application.getControllerForElementAndIdentifier(itineraryCont, 'itinerary-show');
  }

}
