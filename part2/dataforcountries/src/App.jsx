import Filter from "./components/Filter.jsx";
import {useEffect, useState} from "react";
import countriesService from "./services/countries";
import SearchResult from "./components/SearchResult.jsx";

const App = () => {
    const [filter, setFilter] = useState("");
    const [countries, setCountries] = useState([]);
    const [displayed, setDisplayed] = useState(null);   // Currently fully displayed country

    useEffect(() => {
        countriesService
            .getAll()
            .then((countries) => setCountries(countries))
            .catch(err => console.log(err))
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value);
        setDisplayed(null)
    }

    return (
        <div>
            <Filter filter={filter} onChangeFilter={handleFilter} />
            <br/>
            <SearchResult
                result={filter === "" ? [] :
                    countries
                        .filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
                    }
                displayed={displayed}
                setDisplayed={setDisplayed}
            />
        </div>
    )
}

export default App
