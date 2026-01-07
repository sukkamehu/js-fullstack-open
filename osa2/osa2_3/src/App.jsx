import { useState, useEffect } from 'react'
import Phonebook from './components/Note'
import personService from './components/RestHandler'


const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (personObject) => {
    return personService.create(personObject)
      .then(newPerson => {
        console.log('added', newPerson)
        setPersons(persons.concat(newPerson))
        return newPerson
      })
  }

  const deletePerson = (id) => {
    return personService.remove(id)
      .then((removedId) => {
        setPersons(prev => prev.filter(p => p.id !== removedId))
        return removedId
      })
  }

  const updatePerson = (id, updatedPerson) => {
    return personService.patch(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(prev => prev.map(p => p.id === id ? returnedPerson : p))
        return returnedPerson
      })
  }

  console.log('render', persons.length, 'persons')
  return (
    <Phonebook persons={persons} addPerson={addPerson} deletePerson={deletePerson} updatePerson={updatePerson} />
  )
}

export default App