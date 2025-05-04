import "./style.css";
import { getWeather } from "./weather.js";

getWeather(49.2, 18.7, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch((e) => {
    console.error(e);
    alert("Error getting data");
  });

function renderWeather({ current, daily, hourly }) {
  // renderCurrentWeather(current);
  // renderDailyWeather(daily);
  // renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}
