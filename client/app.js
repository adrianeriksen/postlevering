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
  const loadingElement = document.createElement("p");
  loadingElement.textContent = "Laster...";

  appElement.replaceChildren(loadingElement);

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

  if (days[0].getTime() == today.getTime()) {
    drawDeliveries(true, days[1]);
  } else {
    drawDeliveries(false, days[0]);
  }
};

const appElement = document.getElementById("app");

const drawDeliveries = (isDeliveryToday, nextDate) => {
    const deliveryElement = document.createElement("p");
    deliveryElement.textContent = (isDeliveryToday) ? "I dag kommer posten!" : "Ingen postlevering i dag.";

    const nextDateElement = document.createElement("p");
    nextDateElement.textContent = `Neste leveringsdag er ${getNorwegianDate(nextDate)}`;

    appElement.replaceChildren(deliveryElement, nextDateElement);
}

const form = document.getElementById("form");
const postcodeField = document.getElementById("postcodeField");

form.addEventListener("submit", onPostcodeSubmit);
postcodeField.addEventListener("input", onPostcodeChange);
