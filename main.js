import "./style.css";
import { getWeather } from "./weather.js";

getWeather(49.2, 18.7, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
  (data) => {
    console.log(data);
  }
);
