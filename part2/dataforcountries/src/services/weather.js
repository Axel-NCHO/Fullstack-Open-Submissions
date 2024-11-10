import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,wind_speed_10m"


const getCurrent = ([lat, lng]) => {
    const finalUrl = baseUrl
        .replace("{lat}", lat)
        .replace("{lng}", lng);
    return axios
        .get(finalUrl)
        .then(res =>
            ({
                current_temp: res.data.current.temperature_2m,
                current_wind: res.data.current.wind_speed_10m
            }))
}

export default { getCurrent }