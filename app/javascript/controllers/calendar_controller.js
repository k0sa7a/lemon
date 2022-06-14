import { Controller } from "stimulus"

export default class extends Controller {
  static targets= ["button"]

  connect() {
    console.log("Hello testing")
  }

  clickcalbutton(event) {
    window.scrollTo(0, 342)
  }
}
