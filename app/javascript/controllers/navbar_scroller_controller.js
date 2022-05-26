import { Controller } from "stimulus"

export default class extends Controller {
  static targets= ["nav"]
  connect() {
    console.log("hello")
  }

  scroller(event) {
    console.log(this.navTarget);
    if (window.scrollY >= 50 ) {
      this.navTarget.classList.add("scrolled");
    }
    else {
      this.navTarget.classList.remove("scrolled");
    }
  }
}
