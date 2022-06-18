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



    this.geocoder.setPlaceholder("Postcode")
    // alternative solution where input value of geocoder is updated when hidden input is not empty (created some issues with the dropdown always appearing)
    // if (this.addressTarget.value != "") {
    //   this.geocoder.setInput(this.addressTarget.value)
    // }
    if (this.addressTarget.value != "") {
      this.geocoder.setPlaceholder(this.addressTarget.value)
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
