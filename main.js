import "./style.css";
import { getWeather } from "./weather.js";

getWeather(49.2, 18.7, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch((e) => {
    console.error(e);
    alert("Error getting data");
  });

function renderWeather({ currentWeather, dailyWeather, hourlyWeather }) {
  renderCurrentWeather(currentWeather);
  // renderDailyWeather(daily);
  // renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}

// helper functions

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `icons/${iconCode}.svg`;
}

//
const currentIcon = document.querySelector("[data-current-icon]");

function renderCurrentWeather(current) {
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
