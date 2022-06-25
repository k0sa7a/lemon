import flatpickr from "flatpickr";

const initFlatpickr = () => {
  flatpickr(".datepicker", {
    altInput: true,
    altFormat: "F j, Y H:i",
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    enableTime: true,
    inline: true
  });
}

export { initFlatpickr };
