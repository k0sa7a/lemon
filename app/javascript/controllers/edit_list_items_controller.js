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
    let deleteStart = false
    if (this.itemTarget.classList.value.includes('itinerary_table__start-point')){
      deleteStart = true
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
    .then(() => { if (deleteStart) {
      console.log('started')
      return this.itineraryShowController.InitialStartCoords()
    }})
    .then((response) => {console.log(response)
      console.log('waited')
      this.cleanupMarkers()
    })
    .then(() => this.setCoords())
    .then(() => {console.log('reloading map')})
    .then(() => this.mapController.reload())
    // .then(() => {setTimeout(()=>{this.itineraryShowController.setStartCoords()},5000)})
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
    console.log(event)
    let startRemoved = false
    try {
      this.itineraryShowController.removeStart()
    } catch (error) {
      console.log(error)
      startRemoved = true
    }

    const url = this.formTarget.action
    fetch(url, {
        method: "PATCH",
        headers: { "Accept": "text/plain" },
        body: new FormData(this.formTarget)
      })
        .then(response => response.text())
        .then((data) => {this.itemTarget.outerHTML = data})
        .then(() => { this.itineraryShowController.setStartCoords()})
        .then(() => {if (startRemoved == false) {
          document.querySelector('.truck').remove()
        }})
        .then(() => {if (startRemoved == false) {
          this.mapController.reload()
        }})
        .catch(err => console.log(err))
  }

  async resetStart() {
    // await this.formTarget.requestSubmit()


    const url = this.formTarget.action
    await fetch(url, {
        method: "PATCH",
        headers: { "Accept": "text/plain" },
        body: new FormData(this.formTarget)
      })
        .then(response => response.text())
        .then((data) => {this.itemTarget.outerHTML = data})
        .then(() => {this.itineraryShowController.setStartCoords()})
        .then(() => { return console.log('complete resetStart')})
        .catch(err => console.log(err))
        .then(() => {return console.log('returned reset')})



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
