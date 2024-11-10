import Languages from "./Languages.jsx";
import Flag from "./Flag.jsx";
import Weather from "./Weather.jsx";
import {useState} from "react";

const Capital = ({capital}) => (
    <li>
        {capital}
    </li>
)

const Capitals = ({capitals}) => {
    if (capitals.length <= 1) {
        return (
            <>
                <div>Capital {capitals[0]}</div>
            </>

        )
    }
    else {
        return (
            <>
                <div>Capital</div>
                <ul>
                    {capitals.map(capital => (<Capital key={capital} capital={capital}/>))}
                </ul>
            </>)
    }
}

const Country = ({country}) => {
    const [weather, setWeather] = useState({});

    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>Common name : {country.name.common}</p>
            <br/>
            <Capitals capitals={country.capital}/>
            <br/>
            <Languages languages={country.languages}/>
            <br/>
            <Flag flag={country.flags}/>
            <br/>
            <Weather country={country} weather={weather} setWeather={setWeather} />
        </div>)
}

export default Country