const WEEKDAYS = [
  "søndag",
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];
const MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

let postcode = null;

const getToday = () => {
  const date = new Date().toISOString().slice(0, 10);
  return new Date(date);
};

const fetchDeliveryDays = (postcode) => {
  fetch(
    `https://postlevering.aer.dev/api/delivery/fetchdays?postcode=${postcode}`
  )
    .then((response) => response.json())
    .then((content) => {
      const days = [new Date(content[0]), new Date(content[1])];
      updateInformation(days);
    });
};

const onPostcodeChange = () => {
  postcode = postcodeField.value;
};

const onPostcodeSubmit = (event) => {
  event.preventDefault();
  fetchDeliveryDays("2000");
};

const getNorwegianDate = (date) => {
  _weekday = WEEKDAYS[date.getDay()];
  _date = date.getDate();
  _month = MONTHS[date.getMonth()];
  return `${_weekday} ${_date}. ${_month}`;
};

const updateInformation = (days) => {
  const today = getToday();
  const nextDay = days[0];

  if (nextDay.getTime() == today.getTime()) {
    document.getElementById("information").textContent = "I dag kommer posten!";
  }

  const nextDaysElement = document.getElementById("nextDays");

  const node = document.createElement("li");
  node.textContent = getNorwegianDate(nextDay);

  const node2 = document.createElement("li");
  node2.textContent = getNorwegianDate(days[1]);

  nextDaysElement.appendChild(node);
  nextDaysElement.appendChild(node2);
};

const form = document.getElementById("form");
const postcodeField = document.getElementById("postcodeField");

form.addEventListener("submit", onPostcodeSubmit);
postcodeField.addEventListener("input", onPostcodeChange);
