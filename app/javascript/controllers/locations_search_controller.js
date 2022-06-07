import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "form", "input", "list" ]

  connect() {
    console.log(this.inputTarget)
    console.log(this.formTarget)
    console.log(this.listTarget)
  }
}
