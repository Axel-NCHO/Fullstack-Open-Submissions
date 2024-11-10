const Language = ({language}) => (
    <li>{language}</li>
)

const Languages = ({languages}) => (
    <div>
        <h2>Languages</h2>
        <br/>
        <ul>
            {Object.entries(languages).map(language => (<Language key={language[0]} language={language[1]} />))}
        </ul>
    </div>
)

export default Languages