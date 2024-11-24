import './style.css'
import  {getWeather} from "./weather.js";


getWeather(10,10,Intl.DateTimeFormat().resolvedOptions().timeZone).then( result => {
    console.log(result.data);
})


