import { Controller } from "stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {apiKey: String}
  static targets = [ "address"]

  connect() {
    this.geocoder = new MapboxGeocoder ({
      accessToken: this.apiKeyValue,
      types: "postcode, locality, neighborhood, address, poi"
    });
    this.geocoder.addTo(this.element)



    this.geocoder.setPlaceholder("Post Code")
    if (this.addressTarget.value != "") {
      this.geocoder.setInput(this.addressTarget.value)
    }

    this.geocoder.on("result", event => this.#setInputValue(event))
    this.geocoder.on("clear", () => this.#clearInputValue())
  }
  #setInputValue(event) {
    this.addressTarget.value = event.result["place_name"]
  }
  #clearInputValue() {
    this.addressTarget.value = ""
  }
}
