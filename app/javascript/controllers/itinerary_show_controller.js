import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  // static values = { apiKey: String }

  static targets = ["listItem", "startPoint", "map"]


  connect() {
    console.log(this.listItemTarget)
  }

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

  async InitialStartCoords() {
    await this.itemController.resetStart()
    console.log('completed initialstars')
    return true
  }

  get itemController() {
    let item = this.listItemTarget;
    return this.application.getControllerForElementAndIdentifier(item, 'edit-list-items');
  }

}
