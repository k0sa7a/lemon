import { Controller } from "stimulus"


export default class extends Controller {
  static targets = ["dropDown"];

  connect() {
    var newOption = new Option("Text", "Value");
    this.dropDownTargets[0].options[this.dropDownTargets[0].options.length] = newOption;

    // let option = this.dropDownTargets[0][1].cloneNode(true);
    // option.value = this.dropDownTargets[0].length
    // option.innerHTML = "testytest"


    // console.log(option)
    // console.log(this.dropDownTargets[0][1])

    // // this.dropDownTargets.forEach ((e) => {
    // //   e.children[4].insertAdjacentHTML('afterend', "<option value='5'>testytest</option>");

    //   // // Get all Drop Down/List Box in document
    //   var sel = this.dropDownTargets[0] // document.getElementsByTagName("select");



    //       // Create an Option object and set it's value/text
    //       var opt = document.createElement("option");
    //       opt.text = 'Please select...';
    //       opt.value = 'Please Select';

    //       //prepend in select box
    //       console.log(sel)
    //       sel.appendChild(option)

// });

  }
  updateLists(obj) {
    console.log(this.dropDownTargets)
    console.log(JSON.parse(obj))
    // var newOption = new Option(obj.itinerary.title, obj.itinerary.id);
    // this.dropDownTargets[0].options[this.dropDownTargets[0].options.length] = newOption;
  }
}
