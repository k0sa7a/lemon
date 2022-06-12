import { Controller } from "stimulus"


export default class extends Controller {
  static targets = ["dropDown", "modal", "createItineraryCont", "addListItemForm"];



  hideForm() {
    this.addListItemFormTargets.forEach((element, index) => {
      if (element.classList.contains("d-none")) {
        this.addListItemFormTargets[index].classList.remove("d-none");
        this.createItineraryContTargets[index].classList.add("d-none");
      }
    });

    this.addListItemFormTarget.classList.remove("d-none");
    this.createItineraryContTarget.classList.add("d-none");
  }

  updateLists(obj) {

    this.dropDownTargets.forEach(element => {
      element.options[element.options.length] = new Option(obj.itinerary.title, obj.itinerary.id);
    });
    this.hideForm()
    this.addItineraryToNavBar(obj)
  }

  addItineraryToNavBar(obj) {
    let navDropDown = document.getElementById('routesDropDown')
    let a = document.createElement('a');
    a.href=`/itineraries/${obj.itinerary.id}`
    a.classList.add('dropdown-item')
    a.textContent = `${obj.itinerary.title}`
    navDropDown.appendChild(a)
    if (navDropDown.children[0].innerHTML == 'You have no routes saved') {
      navDropDown.children[0].remove()
    }
  }

}
