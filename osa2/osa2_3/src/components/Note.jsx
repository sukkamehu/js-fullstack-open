import { useState } from 'react'
import Notification from './Notification'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map(person => (
      <p key={person.id}>
        {person.name}: {person.number} <button onClick={() => onDelete(person)}>delete</button>
      </p>
    ))}
  </div>
)

const AddPersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Phonebook = (props) => {
  console.log(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const notify = (text, type = 'success') => {
    setNotification(text)
    setNotificationType(type)
    setTimeout(() => setNotification(null), 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const existing = props.persons.find(person => person.name === newName)
    if (existing) {
      if (confirm(`${newName} is already added to phonebook, replace number ${existing.number} with a new one ${newNumber}?`)) {
        const updated = { ...existing, number: newNumber }
        props.updatePerson(existing.id, updated)
          .then(() => {
            notify(`Updated ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            notify(`Error updating ${newName}: ${error.message}`, 'error')
          })
      }
      return
    }

    props.addPerson(nameObject)
      .then(() => {
        notify(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        notify(`Error adding ${newName}: ${error.message}`, 'error')
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter ? props.persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : props.persons

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <AddPersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={(person) => {
        if (confirm('Are you sure you want to delete this person?')) {
          props.deletePerson(person.id)
            .then(() => {
              notify(`Deleted ${person.name}`)
            })
            .catch(error => {
              if (error.response?.status === 404) {
                notify(`${person.name} was already removed from the server`, 'error')
              } else {
                notify(`Error deleting ${person.name}: ${error.message}`, 'error')
              }
            })
        }
      }} />
    </div>
  )
}
export default Phonebook
