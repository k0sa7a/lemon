import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["addListItemForm", "createItineraryForm", "cancelItineraryButton"];

  displayForm() {
    this.addListItemFormTarget.classList.add("d-none");
    this.createItineraryFormTarget.classList.remove("d-none");
  }

  cancelForm() {
    this.addListItemFormTarget.classList.remove("d-none");
    this.createItineraryFormTarget.classList.add("d-none");
  }
}
