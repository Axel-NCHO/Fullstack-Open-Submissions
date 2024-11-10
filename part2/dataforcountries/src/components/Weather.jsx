import weatherService from "../services/weather.js"
import {useEffect} from "react";

const Weather = ({country, weather, setWeather}) => {

    useEffect(() => {
        if (country) {
            weatherService
                .getCurrent(country.capitalInfo.latlng)
                .then(weather => setWeather(weather))
        }
    }, [country]);

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <div>Temperature: {weather.current_temp} °C</div>
            <div>Wind speed : {weather.current_wind} km/h</div>
        </div>
    )
}

export default Weather