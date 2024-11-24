import Axios from "axios";
import axios from "axios";

/*
 https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime

 */


export function getWeather(lat, lon, timezone) {
   return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime", {
    params: {
      latitude: lat,
      longitude: lon,
      timezone: timezone,
    },
  }
  ).then(({data}) => {
      return  {
          current: parseCurrentWeather(data),
          daily: parseDailyWeather(data),
          hourly: parseHourlyWeather(data)

      }
   });
}


function parseCurrentWeather({current_weather, daily}) {

    const {
        temperature: currentTemp,
        windSpeed: windSpeed,
        weathercode: iconCode}
        = current_weather;

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_max: [maxTemp],
        temperature_2m_max: [maxTemp],
        temperature_2m_max: [maxTemp],
        temperature_2m_max: [maxTemp]

    } = daily;

    return {
        currentTemp,
        highTemp: ,
        lowTemp: ,
        highFeelsLike: ,
        lowFeelsLike: ,
        windSpeed,
        iconCode

    }
}

