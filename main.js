import { ICON_MAP } from "./iconmap.js";
import "./style.css";
import { getWeather } from "./weather.js";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError); // to get geo location

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((e) => {
      console.error(e);
      alert("Error getting weather.");
    });
}

function positionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page."
  );
}

function renderWeather({ currentWeather, dailyWeather, hourlyWeather }) {
  renderCurrentWeather(currentWeather);
  renderDailyWeather(dailyWeather);
  renderHourlyWeather(hourlyWeather);
  document.body.classList.remove("blurred");
}

// helper functions
function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `Icons/${ICON_MAP.get(iconCode)}.svg`;
}
//

function renderCurrentWeather(current) {
  const currentIcon = document.querySelector("[data-current-icon]");
  currentIcon.src = getIconUrl(current.iconCode);
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-wind", current.windMax);
  setValue("current-precip", current.rain);

  const shortSunrise = current.sunrise.slice(11, 16);
  const shorSunset = current.sunset.slice(11, 16);

  setValue("current-sunrise", shortSunrise);
  setValue("current-sunset", shorSunset);
}

///////

function renderDailyWeather(daily) {
  const dailySection = document.querySelector("[data-hour-section]");
  const dayCardTemplate = document.getElementById("day-card-template");

  dailySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    const objDate = new Date(day.date); //if hour.date is a string (like "2025-05-04"), you'll need to convert it to a Date object first.
    const shortDate = objDate.toLocaleDateString("en-US", { weekday: "long" });

    setValue("temp", day.maxTemp, { parent: element });
    setValue("date", shortDate, { parent: element });

    element.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
    dailySection.append(element);
  });
}

//////////////

function renderHourlyWeather(hourly) {
  const hourlySection = document.querySelector("[data-hour-section]");
  const hourRowTemplate = document.getElementById("hour-row-template");

  hourlySection.innerHTML = "";

  hourly.forEach((hour) => {
    const element = hourRowTemplate.content.cloneNode(true);
    const objDate = new Date(hour.date); //if hour.date is a string (like "2025-05-04"), you'll need to convert it to a Date object first.
    const shortDate = objDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const time = hour.date.slice(11, 16);

    setValue("temp", hour.temp, { parent: element });
    setValue("day", shortDate, { parent: element });
    setValue("time", time, { parent: element });
    setValue("wind", hour.windSpeed, { parent: element });
    setValue("humidity", hour.humidity, { parent: element });
    setValue("precip", hour.precip, { parent: element });

    element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
    hourlySection.append(element);
  });
}
