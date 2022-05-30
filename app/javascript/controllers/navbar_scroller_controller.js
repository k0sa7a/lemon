import { Controller } from "stimulus"

export default class extends Controller {
  static targets= ["nav", "link"]
  connect() {
  }

  scroller(event) {
    if (window.scrollY >= 50 ) {
      this.navTarget.classList.add("scrolled");
      this.linkTarget.classList.add("textcolor");
    }
    else {
      this.navTarget.classList.remove("scrolled");
      this.linkTarget.classList.remove("textcolor");
    }
  }
}
