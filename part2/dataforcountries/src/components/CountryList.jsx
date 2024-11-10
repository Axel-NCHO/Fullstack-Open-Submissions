const CountryList = ({list, onShowCountry}) => (
    <div>
        {list.map((country) => (
            <div key={country.name.official}>
                {country.name.official}
                <button onClick={() => onShowCountry(country)}>Show</button>
            </div>

        ))}
    </div>
)

export default CountryList