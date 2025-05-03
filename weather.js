import axios from "axios";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,rain,weather_code";

export function getWeather(lat, lon, timezone) {
  return axios
    .get(API_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
      },
    })
    .then(({ data }) => {
      // shorhand for   then.response,  const data = response
      //console.log(data);

      return {
        currentWeather: parseCurrentWeather(data), //vratenie  parsovanych premennych
        dailyWeaher: parseDailyWeather(data),
        hourlyWeather: parseHourlyWeather(data),
      };
    });
}

function parseCurrentWeather({ current, daily }) {
  //destrukturovanie premennych
  const {
    temperature_2m: currentTemp,
    relative_humidity_2m: humidity,
    rain: rain,
  } = current;

  const {
    temperature_2m_max: [tempMax],
    temperature_2m_min: [tempMin],
    wind_speed_10m_max: [windMax],
    sunrise: [sunrise],
    sunset: [sunset],
  } = daily;

  return {
    currentTemp,
    highTemp: tempMax,
    lowTemp: tempMin,
    humidity,
    rain,
    sunrise,
    sunset,
    windMax,
  };
}

function parseDailyWeather({ daily }) {
  // pozor teraz musis loopnut cez object poli

  return daily.time.map((time, index) => {
    return {
      date: time,
      iconCode: daily.weather_code[index],
      maxTemp: daily.temperature_2m_max[index],
    };
  });
}

function parseHourlyWeather({ hourly, current }) {
  return hourly.time
    .map((time, index) => {
      return {
        date: time,
        dayStatus: hourly.is_day[index],
        iconCode: hourly.weather_code[index],
        temp: hourly.temperature_2m[index],
        humidity: hourly.relative_humidity_2m[index],
        windSpeed: hourly.wind_speed_10m[index],
      };
    })
    .filter(({ date }) => new Date(date) >= new Date(current.time));
}
