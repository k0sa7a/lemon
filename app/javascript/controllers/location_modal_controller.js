import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs"
import Swal from 'sweetalert2'

export default class extends Controller {
  static targets = ["addListItemFormContainer", "createItineraryForm", "cancelItineraryButton", "createItineraryCont", "inputTitle", "addListItemForm"];

  displayForm() {
    this.addListItemFormContainerTarget.classList.add("d-none");
    this.createItineraryContTarget.classList.remove("d-none");
  }

  cancelForm() {
    this.addListItemFormContainerTarget.classList.remove("d-none");
    this.createItineraryContTarget.classList.add("d-none");
  }

  createItinerary(event) {
    event.preventDefault()
    fetch(this.createItineraryFormTarget.action, {
      method: "POST",
      headers: {"Accept": "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.createItineraryFormTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.indexController.updateLists(data)
      Swal.fire({
        title: 'Success!',
        text: 'Itinerary added!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    })
    this.cancelForm()
  }

  addItemToItinerary(event) {
    console.log(this.addListItemFormTarget)
    event.preventDefault()
    fetch(this.addListItemFormTarget.action, {
      method: "POST",
      headers: {"Accept": "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.addListItemFormTarget)
    })
    .then(response => response)
    .then((data) => {
      console.log(data)
      Swal.fire({
        title: 'Success!',
        text: 'Location added!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    })
  }

  get indexController() {
    let item = document.querySelector('.locations-container');
    return this.application.getControllerForElementAndIdentifier(item, 'location-index');
  }
}