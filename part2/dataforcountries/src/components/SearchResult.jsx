import Country from "./Country.jsx";
import CountryList from "./CountryList.jsx";
import { useState } from "react";

const SearchResult = ({result, displayed, setDisplayed}) => {

    const onShowCountry = (country) =>
        setDisplayed(country);

    if (result.length === 0)
        return (<div>Specify a filter on countries names</div>)

    if (result.length > 10)
        return (<div>Too many matches specify another filter</div>)

    if (result.length <= 10 && result.length > 1) {
        if (displayed !== null) {
            return (<Country country={displayed}/>)
        }
        return (<CountryList list={result} onShowCountry={onShowCountry}/>)
    }
    else {
        displayed = result[0]
        return (<Country country={displayed}/>)
    }
}

export default SearchResult