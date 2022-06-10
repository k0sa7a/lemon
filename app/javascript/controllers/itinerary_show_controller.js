import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  // static values = { apiKey: String }

  static targets = ["listItem", "startPoint", "map"]

  removeStart() {
    this.startPointTarget.querySelector(".form").classList.remove("d-none")
    this.startPointTarget.classList.remove("itinerary_table__start-point");
    this.startPointTarget.querySelector("p").classList.add("d-none")
    this.startPointTarget.dataset.itineraryShowTarget = 'listItem'
  }

  setStartCoords() {
    let coords = this.startPointTarget.dataset.editListItemsCoordsValue
    this.mapTarget.dataset.mapboxOptimizationStartValue = coords
  }

  InitialStartCoords() {
    let coords = this.listItemTargets[1].dataset.editListItemsCoordsValue
    this.listItemTargets[1].dataset.itineraryShowTarget = 'listItem startPoint'
    this.listItemTargets[1].classList.add('itinerary_table__start-point')
    this.mapTarget.dataset.mapboxOptimizationStartValue = coords
  }

}
