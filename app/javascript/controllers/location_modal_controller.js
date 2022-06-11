import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = ["addListItemForm", "createItineraryForm", "cancelItineraryButton", "createItineraryCont", "inputTitle"];


  displayForm() {
    this.addListItemFormTarget.classList.add("d-none");
    this.createItineraryContTarget.classList.remove("d-none");
  }

  cancelForm() {
    this.addListItemFormTarget.classList.remove("d-none");
    this.createItineraryContTarget.classList.add("d-none");
  }

  createItinerary(event) {
    event.preventDefault()
    // console.log(this.createItineraryFormTarget.action)
    let title = this.inputTitleTarget.value
    fetch(this.createItineraryFormTarget.action, {
      method: "POST",
      headers: {"Accept": "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.createItineraryFormTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.modalController.updateLists(data)
      console.log(data)
    })

    this.modalController.updateLists()
  }

  get modalController() {
    let item = document.querySelector('.locations-container');
    return this.application.getControllerForElementAndIdentifier(item, 'location-index');
  }
}
