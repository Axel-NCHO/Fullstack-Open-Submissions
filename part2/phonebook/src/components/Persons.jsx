const Persons = (props) => (
    <>
        {/* Filter with startswith() */}
        {props.persons
            .filter(person => props.isWhiteSpace(props.filter) ? true :
                person.name.toLocaleLowerCase().startsWith(props.filter.toLocaleLowerCase()))
            .map(person =>
                <div key={person.name}>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => props.deletePerson(person.id)}>Delete</button>
                </div>
            )}
    </>
)

export default Persons