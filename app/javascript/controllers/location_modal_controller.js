import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = [
    "addListItemFormContainer",
    "createItineraryForm",
    "cancelItineraryButton",
    "createItineraryCont",
    "inputTitle",
    "addListItemForm",
  ];

  displayForm() {
    this.addListItemFormContainerTarget.classList.add("d-none");
    this.createItineraryContTarget.classList.remove("d-none");
  }

  cancelForm() {
    this.addListItemFormContainerTarget.classList.remove("d-none");
    this.createItineraryContTarget.classList.add("d-none");
  }

  createItinerary(event) {
    event.preventDefault();
    fetch(this.createItineraryFormTarget.action, {
      method: "POST",
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.createItineraryFormTarget),
    })
      .then((response) => response.json())
      .then((data) => {
        this.indexController.updateLists(data);
      });
    this.cancelForm();
  }

  addItemToItinerary(event) {
    event.preventDefault();
    fetch(this.addListItemFormTarget.action, {
      method: "POST",
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.addListItemFormTarget),
    })
      .then((response) => response)
      .then((data) => {
        console.log(data);
      });
    // .then(() => this.resetForm());
  }

  resetForm() {
    this.addListItemFormTarget.reset();
    console.log("hi");
  }

  get indexController() {
    let item = document.querySelector(".locations-container");
    return this.application.getControllerForElementAndIdentifier(
      item,
      "location-index"
    );
  }
}
