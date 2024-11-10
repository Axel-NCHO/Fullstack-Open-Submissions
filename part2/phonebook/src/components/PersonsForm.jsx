const PersonsForm = ({ newName, newNumber, updateNewName, updateNewNumber, createNewPerson}) => (
    <form onSubmit={createNewPerson}>
        <div>
            name: <input value={newName} onChange={updateNewName}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={updateNewNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonsForm