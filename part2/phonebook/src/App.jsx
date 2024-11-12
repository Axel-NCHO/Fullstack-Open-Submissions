import { useEffect, useState } from 'react'
import Filter from "./components/Filter.jsx";
import PersonsForm from "./components/PersonsForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import personService from "./services/persons.js"


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notif, setNotif] = useState({message: "", type: ""})

    useEffect(() => {
        personService
            .getAll()
            .then(collection => setPersons(collection))
            .catch(err => console.log(err))
    }, [])

    const isWhiteSpace = (s) => /^\s*$/.test(s)

    const createNewPerson = (event) => {
        event.preventDefault()
        if (isWhiteSpace(newName) || isWhiteSpace(newNumber)) {
            alert("Missing contact information")
        }
        else {
            const person = { name: newName.trim(), number: newNumber.trim() }
            const idx = persons.findIndex(p => p.name === person.name)
            if (idx >= 0) {
                if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with a new one ?`)) {
                    updatePerson({...person, id: persons[idx].id})
                }
            }
            else {
                personService
                    .createPerson(person)
                    .then(newPerson => {
                        setPersons([...persons, newPerson])
                        setNewName('')
                        setNewNumber('')
                        return newPerson})
                    .then(newPerson => {
                        setNotif({message: `Added ${newPerson.name}`, type: "success"})
                        setTimeout(() =>
                            setNotif({message: "", type: ""}), 5000)
                    })
                    .catch(err => {
                        setNotif({message: err.response.data.error, type: "error"})
                        setTimeout(() =>
                            setNotif({message: "", type: ""}), 5000)
                    })
            }
        }
    }

    const updatePerson = (person) => {
        personService
            .updatePerson(person.id, person)
            .then(updatedPerson => {
                setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
                return updatedPerson
            })
            .then(updatedPerson => {
                setNotif({message: `Updated ${updatedPerson.name}'s number`, type: "success"})
                setTimeout(() =>
                    setNotif({message: "", type: ""}), 5000)
            })
            .catch((err) => {
                setNotif({message: err.response.data.error, type: "error"})
                setTimeout(() =>
                    setNotif({message: "", type: ""}), 5000)
            })
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (person == null)
            alert("Not found")
        else {
            if (window.confirm(`Delete ${person.name} ?`)) {
                personService
                    .deletePerson(id)
                    .then(() => {
                        personService
                            .getAll()
                            .then(collection => setPersons(collection))
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    const updateNewName = (event) => {
        setNewName(event.target.value)
    }

    const updateNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const updateFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notif.message} type={notif.type} />

            <Filter filter={filter} updateFilter={updateFilter} />

            <h2>Add a new</h2>
            <PersonsForm newName={newName} updateNewName={updateNewName}
                         newNumber={newNumber} updateNewNumber={updateNewNumber}
                         createNewPerson={createNewPerson}/>

            <h2>Numbers</h2>
            <Persons filter={filter} persons={persons} isWhiteSpace={isWhiteSpace} deletePerson={deletePerson} />
        </div>
    )
}

export default App
